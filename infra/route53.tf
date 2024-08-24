

data "aws_route53_zone" "yoav_klein" {
  name         = "yoav-klein.com"
  private_zone = false
}

resource "aws_route53_record" "grocery" {
  zone_id = data.aws_route53_zone.yoav_klein.zone_id
  name    = "grocery.${data.aws_route53_zone.yoav_klein.name}"
  type    = "A"
  
  alias {
    name                   = aws_lb.this.dns_name
    zone_id                = aws_lb.this.zone_id
    evaluate_target_health = false
  }
}
