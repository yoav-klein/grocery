
resource "aws_security_group" "load_balancer" {
    name = "load-balancer"
    vpc_id = module.vpc.vpc_id

    ingress {
        from_port = 80
        to_port = 80
        protocol = "TCP"
        description = "HTTP"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_security_group_rule" "server_from_lb" {
  type              = "ingress"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  source_security_group_id = aws_security_group.load_balancer.id
  security_group_id        = aws_security_group.asg.id
}


resource "aws_security_group_rule" "lb_to_server" {
  type              = "egress"
  from_port         = 8080
  to_port           = 8080
  protocol          = "tcp"
  source_security_group_id = aws_security_group.asg.id
  security_group_id        = aws_security_group.load_balancer.id
}


resource "aws_lb" "this" {
  name               = "grocery-app"
  internal           = false
  load_balancer_type = "application"
  subnets            = module.vpc.public_subnet_ids
  security_groups    = [aws_security_group.load_balancer.id]

  tags = {
    Environment = "production"
    App = "Grocery"
  }
}

resource "aws_lb_listener" "front_end" {
  load_balancer_arn = aws_lb.this.arn
  port              = "80"
  protocol          = "HTTP"
 
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this.arn
  }
}

resource "aws_lb_target_group" "this" {
  name     = "grocery-app"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id
  target_type = "instance"

}

output "alb-domain-name" {
    description = "Domain name of the Network Load Balancer"
    value = aws_lb.this.dns_name
}
