# Mugle Server

### Requirements

* Node 12.x
* MongoDB

### Third-Parties

* Twilio - used for obtaining TURN/STUN servers for NAT traversal

### Development Setup

1. Run `npm install`
2. Create a new MongoDB database
3. Copy the file `.env.example` to `.env`
4. Fill out the MongoDB URI with your MongoDB Connection URI
5. Fill out the Twilio account SID and auth token
6. Start development server with `npm run dev`

#### Linting

Run eslint with `npm run lint`

#### Testing

Run tests with `npm run test`
