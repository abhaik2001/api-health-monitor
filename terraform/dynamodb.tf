resource "aws_dynamodb_table" "api_endpoints" {
  name         = "ApiEndpoints"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
