


resource "aws_security_group" "server" {
  name   = "ASG-security-group"
  vpc_id = module.vpc.vpc_id

}

resource "aws_security_group_rule" "ssh_in" {
  type              = "ingress"
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
  security_group_id = aws_security_group.server.id
  cidr_blocks       = ["0.0.0.0/0"]
}

resource "aws_security_group_rule" "allout" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = -1
  security_group_id = aws_security_group.server.id
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


resource "aws_instance" "this" {
  ami                  = "ami-0a0e5d9c7acc336f1"
  key_name             = aws_key_pair.this.key_name
  instance_type        = "t2.medium"
  vpc_security_group_ids = [ aws_security_group.server.id ]
  subnet_id = module.vpc.public_subnet_ids[0]
  
  user_data = templatefile("${path.module}/scripts/setup.sh", {tomcat_version = local.tomcat_version})


  tags = {
    Name = "SimpleServer"
  }

}


resource "aws_lb_target_group_attachment" "alb" {
  target_group_arn = aws_lb_target_group.this.arn
  target_id        = aws_instance.this.id
  port             = 8080
}

output "server_domain" {
    description = "Domain name"
    value = aws_instance.this.public_dns
}
