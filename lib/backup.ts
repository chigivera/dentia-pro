import AWS from "aws-sdk"
import { api } from "@/lib/api"

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export async function backupDatabase() {
  try {
    const data = await api.get("/api/export-data")
    const backupName = `backup-${new Date().toISOString()}.json`

    await s3
      .putObject({
        Bucket: process.env.AWS_BACKUP_BUCKET_NAME!,
        Key: backupName,
        Body: JSON.stringify(data),
        ContentType: "application/json",
      })
      .promise()

    console.log(`Backup created: ${backupName}`)
  } catch (error) {
    console.error("Failed to create backup:", error)
  }
}

