import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import {
    CloudFrontClient,
    CreateInvalidationCommand,
} from '@aws-sdk/client-cloudfront'

const bucketName = process.env.AWS_BUCKET_NAME ?? ''
const region = process.env.AWS_BUCKET_REGION ?? ''
const accessKeyId = process.env.AWS_ACCESS_KEY ?? ''
const secretAccessKey = process.env.AWS_SECRET_KEY ?? ''
const cloudFrontUrl = process.env.AWS_CDN_URL ?? ''
const distributionId = process.env.DISTRIBUTION_ID ?? ''

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
})

const cloudFront = new CloudFrontClient({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
})

//Upload file to AWS S3
export const uploadFile = async (file: any) => {
    const params = {
        Bucket: bucketName,
        Body: file.buffer,
        Key: file.filename,
        ContentType: file.mimetype,
    }

    const command = new PutObjectCommand(params)
    return await s3.send(command)
}

//Get Signed Url file from AWS S3
export const getFileStream = async (filename: string) => {
    const params = {
        Bucket: bucketName,
        Key: filename,
    }

    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    return url
}
//Get Url file from AWS CloudFront
export const getUrlCdn = (filename: string) => {
    const url = `${cloudFrontUrl}/${filename}`
    return url
}

//Delete file from AWS S3
export const deleteFile = async (filename: string) => {
    const params = {
        Bucket: bucketName,
        Key: filename,
    }

    const command = new DeleteObjectCommand(params)
    await s3.send(command)

    //Invalidate the cloud front cache for that image
    const invalidationParams = {
        DistributionId: distributionId,
        InvalidationBatch: {
            CallerReference: filename,
            Paths: {
                Quantity: 1,
                Items: ['/' + filename],
            },
        },
    }
    const invalidationCommand = new CreateInvalidationCommand(
        invalidationParams
    )
    await cloudFront.send(invalidationCommand)
    return { message: 'ok' }
}
