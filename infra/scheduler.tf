

resource "aws_iam_role" "execution_role" {
    name = "SchedulerExecutionRole"

    assume_role_policy = jsonencode({
      Version = "2012-10-17"
      Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "scheduler.amazonaws.com"
        }
      }
    ]
   })

}

resource "aws_iam_policy" "allow_ec2" {
  name        = "AllowEC2"
  path        = "/"
  description = "My test policy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "ec2:*",
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "allow_ec2" {
    role = aws_iam_role.execution_role.name
    policy_arn = aws_iam_policy.allow_ec2.arn
}

resource "aws_scheduler_schedule" "morning_start" {
  name       = "Morning-Start"

  schedule_expression = "cron(0 5 ? * 1-6 *)"

  flexible_time_window {
    mode = "OFF"
  }

  target {
    arn      = "arn:aws:scheduler:::aws-sdk:ec2:startInstances"
    role_arn = aws_iam_role.execution_role.arn
    input = jsonencode({InstanceIds = [aws_instance.this.id]})
  }
}

resource "aws_scheduler_schedule" "evening_end" {
  name       = "Evening-End"

  schedule_expression = "cron(0 18 ? * 1-5 *)"

  flexible_time_window {
    mode = "OFF"
  }

  target {
    arn      = "arn:aws:scheduler:::aws-sdk:ec2:stopInstances"
    role_arn = aws_iam_role.execution_role.arn
    input = jsonencode({InstanceIds = [aws_instance.this.id]})
  }
}

resource "aws_scheduler_schedule" "evening_end_friday" {
  name       = "Evening-End-Friday"

  schedule_expression = "cron(0 15 ? * 6 *)"

  flexible_time_window {
    mode = "OFF"
  }

  target {
    arn      = "arn:aws:scheduler:::aws-sdk:ec2:stopInstances"
    role_arn = aws_iam_role.execution_role.arn
    input = jsonencode({InstanceIds = [aws_instance.this.id]})
  }
}
