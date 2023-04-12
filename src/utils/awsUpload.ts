import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  constructor(private config: ConfigService) {}

  AWS_S3_BUCKET = this.config.get("aws.aws_s3_bucket");
  s3 = new AWS.S3({
    accessKeyId: this.config.get("aws.aws_s3_access_key"),
    secretAccessKey: this.config.get("aws.aws_s3_key_secret"),
  });

  async uploadFile(file, issuerId): Promise<any> {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
      issuerId,
    );
  }

  async s3_upload(file, bucket, name, mimetype, issuerId) {
    const params = {
      Bucket: bucket,
      Key: `${issuerId}/${Date.now().toString()}-${String(name)}`,
      Body: file,
      // ACL: 'public-read',
      ContentDisposition: 'inline',
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      // {
      //   ETag: '"5fb97e9da496bb3f765e95bc7366bb17"',
      //   Location: 'https://mms-edufied-uploadbucket.s3.amazonaws.com/stage/epdtest/awsUpload.ts',
      //   key: 'stage/epdtest/awsUpload.ts',
      //   Key: 'stage/epdtest/awsUpload.ts',
      //   Bucket: 'mms-edufied-uploadbucket'
      // }
      return { fileUploadedUrl: s3Response.Key, originalFileName: name };
    } catch (e) {
      return 'File is not uploaded. Please try again';
    }
  }

  async downloadFile(fileName: string): Promise<string> {
    const url = this.s3.getSignedUrl('getObject', {
      Bucket: this.AWS_S3_BUCKET,
      Key: fileName,
      Expires: 60 * 5,
    });

    return url;
  }
}
