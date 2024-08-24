

data "aws_ami" "ubuntu" {
  most_recent      = true

  filter {
    name   = "name"
    values = ["Ubuntu Server*"]
  }
}


resource "aws_security_group" "asg" {
  name   = "ASG-security-group"
  vpc_id = module.vpc.vpc_id

}

resource "aws_security_group_rule" "ssh_in" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  security_group_id = aws_security_group.asg.id
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "allout" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = -1
  security_group_id = aws_security_group.asg.id
  cidr_blocks       = ["0.0.0.0/0"]
}


resource "tls_private_key" "this" {
    algorithm = "RSA"
}

resource "local_file" "private_key" {
    content = tls_private_key.this.private_key_pem
    filename = "${path.root}/private.key"
    file_permission = "0600"
}

resource "aws_key_pair" "this" {
  key_name   = "my-keys"
  public_key = tls_private_key.this.public_key_openssh
}


resource "aws_launch_template" "this" {
  name_prefix   = "grocery-app-"
  image_id      = "ami-0a0e5d9c7acc336f1"
  instance_type = "t2.medium"
  user_data     = base64encode(templatefile("${path.module}/scripts/setup.sh", {tomcat_version = local.tomcat_version}))
  vpc_security_group_ids = [aws_security_group.asg.id]
  key_name = aws_key_pair.this.key_name
}


resource "aws_autoscaling_group" "this" {
  name = "grocery-app-ASG"

  desired_capacity   = 1
  max_size           = 2
  min_size           = 1

  vpc_zone_identifier = module.vpc.public_subnet_ids

  target_group_arns = [aws_lb_target_group.this.arn]

  health_check_type = "ELB"
# min_elb_capacity = 1

  launch_template {
    id      = aws_launch_template.this.id
    version = "$Latest"
  }

  lifecycle {
    replace_triggered_by = [ 
        aws_launch_template.this,
#        filesha256(file("${path.module}/scripts/setup.sh"))
    ]
#    create_before_destroy = true
  }
}

resource "aws_autoscaling_schedule" "weekend_shutdown" {
    autoscaling_group_name = aws_autoscaling_group.this.name
    scheduled_action_name = "weekend"
    min_size = 0
    max_size = 0
    desired_capacity = 0
    recurrence = "0 13 * * 5"
    
}

resource "aws_autoscaling_schedule" "morning_start" {
    autoscaling_group_name = aws_autoscaling_group.this.name
    scheduled_action_name = "Morning Start"
    min_size = 1
    max_size = 2
    desired_capacity = 1
    recurrence = "0 5 * * 0-5"
}

resource "aws_autoscaling_schedule" "evening_end" {
    autoscaling_group_name = aws_autoscaling_group.this.name
    scheduled_action_name = "Evening End"
    min_size = 0
    max_size = 0
    desired_capacity = 0
    recurrence = "0 18 * * 0-4"
}
