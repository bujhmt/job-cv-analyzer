# Job-CV Analyzer

## Setup

1. Install dependencies: `npm install`
2. Create environment file from sample: `cp .env.sample .env`
3. Set environment variables in `.env` file
4. Start the server: `npm run start`
5. Check API docs at `http://localhost:3000/api` (or your port if you changed it)
6. Select POST `/analyze` method, click "Try it out" button
7. Upload job description PDF file using "job" field, upload CV PDF file using "cv" field
8. Click "Execute" button
9. See the result in "Response" section, it should contain JSON with "relevance", "strengths", "weaknesses" and "notes" fields

## Notes

- If you use swagger and provide file with wrong mimetype, you will experience infinite loading due to swagger issue, try to use `curl` or custom request for testing other file types acceptance

