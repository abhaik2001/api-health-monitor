output "sns_topic_arn" {
  value = aws_sns_topic.alerts.arn
}

output "dynamodb_table" {
  value = aws_dynamodb_table.api_endpoints.name
}
