# DRM Implementation Guide for WindevExpert Training Platform

## Overview

The WindevExpert platform uses Google Widevine DRM for video protection, combined with dynamic watermarking to prevent unauthorized distribution of training content.

## DRM Architecture

### 1. Video Storage
- Videos are stored in Firebase/GCP Cloud Storage
- Videos are encrypted at rest using AES-256
- Each video has a unique encryption key

### 2. DRM Protection Layers

#### Google Widevine DRM
- Industry-standard DRM solution
- Supports multiple security levels (L1, L2, L3)
- Hardware-backed security on supported devices
- License server validates user access before playback

#### Dynamic Watermarking
- User-specific watermark overlaid on video
- Contains user ID and timestamp
- Forensic watermarking for tracking leaks
- Invisible watermark embedded in video stream

### 3. Access Control Flow

\`\`\`
1. User requests video playback
2. Frontend requests DRM license from backend
3. Backend validates:
   - User authentication (JWT token)
   - Training purchase verification
   - Access expiration check
4. Backend generates time-limited DRM license
5. License includes user-specific watermark data
6. Video player receives license and plays protected content
\`\`\`

## Implementation Requirements

### Backend (Node.js/NestJS)

\`\`\`typescript
// DRM License Server
@Post('/drm/license')
async generateLicense(@Body() request: DRMLicenseRequest) {
  // 1. Validate user authentication
  const user = await this.authService.validateToken(request.token);
  
  // 2. Verify training access
  const hasAccess = await this.trainingService.verifyAccess(
    user.id,
    request.trainingId
  );
  
  if (!hasAccess) {
    throw new UnauthorizedException('No access to this training');
  }
  
  // 3. Generate Widevine license
  const license = await this.drmService.generateWidevine({
    userId: user.id,
    videoId: request.videoId,
    watermark: `${user.email} - ${Date.now()}`,
    expiresIn: 3600, // 1 hour
  });
  
  return license;
}
\`\`\`

### Frontend (Next.js)

\`\`\`typescript
// Video Player with DRM
import Shaka from 'shaka-player';

const player = new Shaka.Player(videoElement);

// Configure DRM
player.configure({
  drm: {
    servers: {
      'com.widevine.alpha': process.env.NEXT_PUBLIC_DRM_LICENSE_URL
    }
  }
});

// Set license request headers
player.getNetworkingEngine().registerRequestFilter((type, request) => {
  if (type === Shaka.net.NetworkingEngine.RequestType.LICENSE) {
    request.headers['Authorization'] = `Bearer ${userToken}`;
    request.headers['X-User-Id'] = userId;
  }
});

// Load protected content
await player.load(videoUrl);
\`\`\`

## Security Features

### 1. Video Protection
- ✅ Encrypted video files (AES-256)
- ✅ DRM license required for playback
- ✅ Time-limited licenses (1-hour expiration)
- ✅ Device binding (optional)
- ✅ Concurrent stream limits

### 2. Watermarking
- ✅ Visible watermark (user email + timestamp)
- ✅ Invisible forensic watermark
- ✅ Dynamic positioning (prevents cropping)
- ✅ Rotation and opacity variations

### 3. Access Control
- ✅ JWT authentication required
- ✅ Purchase verification
- ✅ Expiration date checking
- ✅ IP-based rate limiting
- ✅ Suspicious activity detection

### 4. Additional Protections
- ✅ Right-click disabled on video
- ✅ Download prevention
- ✅ Screen capture detection (where supported)
- ✅ DevTools detection
- ✅ HDCP enforcement on supported devices

## Firebase/GCP Configuration

### Storage Bucket Setup
\`\`\`bash
# Create encrypted storage bucket
gsutil mb -c STANDARD -l europe-west1 gs://windevexpert-videos

# Enable encryption
gsutil encryption set -k projects/PROJECT_ID/locations/LOCATION/keyRings/KEYRING/cryptoKeys/KEY gs://windevexpert-videos

# Set CORS for video streaming
gsutil cors set cors.json gs://windevexpert-videos
\`\`\`

### Cloud Functions for DRM
\`\`\`typescript
// Firebase Cloud Function for license generation
export const generateDRMLicense = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  // Verify access
  const hasAccess = await verifyTrainingAccess(context.auth.uid, data.trainingId);
  
  if (!hasAccess) {
    throw new functions.https.HttpsError('permission-denied', 'No access to this training');
  }
  
  // Generate license with Widevine
  const license = await generateWidevineLicense({
    userId: context.auth.uid,
    videoId: data.videoId,
    watermark: `${context.auth.token.email} - ${Date.now()}`
  });
  
  return { license };
});
\`\`\`

## Compliance

### GDPR
- User consent for watermarking
- Data retention policies
- Right to access/delete

### PCI-DSS
- Secure payment processing
- No storage of payment credentials

### Copyright Protection
- DMCA compliance
- Takedown procedures
- Content ID system

## Monitoring & Analytics

### Track:
- Video playback attempts
- License generation requests
- Failed authentication attempts
- Suspicious download patterns
- Watermark violations

### Alerts:
- Multiple concurrent streams
- Unusual access patterns
- License server errors
- Storage access anomalies

## Cost Optimization

### Video Encoding
- Use adaptive bitrate streaming (HLS/DASH)
- Multiple quality levels (360p, 720p, 1080p)
- Efficient codecs (H.265/HEVC)

### CDN Strategy
- CloudFlare for global distribution
- Edge caching for popular content
- Bandwidth optimization

### Storage Tiers
- Hot storage: Recent/popular videos
- Cold storage: Older content
- Archive: Rarely accessed

## Testing

### DRM Testing Checklist
- [ ] License generation works
- [ ] Expired licenses rejected
- [ ] Unauthorized access blocked
- [ ] Watermark displays correctly
- [ ] Multiple devices handled
- [ ] Offline playback (if enabled)
- [ ] Error handling
- [ ] Performance under load

## Support & Troubleshooting

### Common Issues
1. **License request fails**: Check authentication token
2. **Video won't play**: Verify browser DRM support
3. **Watermark not showing**: Check license configuration
4. **Slow playback**: CDN configuration issue

### Browser Support
- Chrome/Edge: Full Widevine support
- Firefox: Widevine support
- Safari: FairPlay (alternative DRM)
- Mobile: Platform-specific DRM

## Future Enhancements

- [ ] Offline download with DRM
- [ ] Multi-DRM support (FairPlay, PlayReady)
- [ ] AI-powered piracy detection
- [ ] Blockchain-based certificate verification
- [ ] Advanced analytics dashboard
