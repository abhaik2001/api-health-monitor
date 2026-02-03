API Health Monitoring System (DevOps Project)
📌 Project Overview
The API Health Monitoring System is a production-style DevOps project that continuously monitors the
health of external APIs and services. It periodically checks configured endpoints, detects state changes (UP/
DOWN), stores results persistently, and sends real-time notifications when failures occur.
This project demonstrates end-to-end DevOps practices including containerization, cloud services
integration, infrastructure automation, and troubleshooting real-world deployment issues.
🏗
️ Architecture (High Level)
User / Admin
    │
    ▼
Node.js Health Monitor (Docker / ECS Fargate)
    │
    ├── Health Checks + Retry Logic
    ├── Structured Logging
    │
    ├── DynamoDB (Persistent Storage)
    │
    └── SNS (Email Notifications)
🚀 Features Implemented
• 
• 
• 
• 
• 
• 
• 
• 
• 
✅ Periodic API health checks using Node.js
✅ Retry and timeout logic for reliability
✅ Structured JSON logging
✅ REST API to register endpoints
✅ Dockerized application
✅ DynamoDB for persistent storage
✅ AWS SNS email alerts on state changes
✅ Secure credential handling using environment variables / IAM roles
✅ Terraform-based AWS infrastructure provisioning
1
�
�
️ Tech Stack
• 
• 
• 
• 
• 
• 
• 
Backend: Node.js (Express)
Containerization: Docker
Cloud Provider: AWS
Database: DynamoDB
Notifications: AWS SNS (Email)
Infrastructure as Code: Terraform
Orchestration (Cloud): ECS Fargate
⚙
️ Local Setup (Docker + DynamoDB Local)
1
️
⃣ Prerequisites
• 
• 
• 
Docker
Node.js (for local testing)
AWS CLI
2
️
⃣ Run DynamoDB Local
docker run-d--name dynamodb--network devops-net-p 8000:8000
amazon/dynamodb-local
3
️
⃣ Create DynamoDB Table
aws dynamodb create-table--table-name ApiEndpoints--attribute-definitions AttributeName=id,AttributeType=S--key-schema AttributeName=id,KeyType=HASH--billing-mode PAY_PER_REQUEST--region us-east-1--endpoint-url http://localhost:8000
4
️
⃣ Configure Environment Variables
Create a 
.env file in project root: 
2
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1
5
️
⃣ Build and Run Application
docker build-t api-health-monitor .
docker run-p 3000:3000--network devops-net--env-file .env
api-health-monitor
Application runs at: 
http://localhost:3000
☁
️ AWS Deployment (Terraform)
Terraform is used to provision: - DynamoDB table - SNS topic - IAM roles & policies - ECS Fargate cluster and
task definition
Terraform Commands
terraform init
terraform plan
terraform apply
🔔 Notifications
• 
• 
• 
Email alerts are triggered only when API health state changes
Prevents alert fatigue
Uses AWS SNS with IAM-based authentication
