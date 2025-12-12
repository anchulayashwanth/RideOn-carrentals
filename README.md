# RideOn — MERN Car Rental (Vite + Tailwind)

## Quick Start

### 1) Backend
```bash
cd backend
npm install
# Update backend/.env if needed
npm run dev
```
The API will run at http://localhost:5000

Seed demo cars (optional, replaces all cars):
```bash
curl -X POST http://localhost:5000/api/cars/seed -H "Content-Type: application/json" --data @../frontend/src/data/cars.json
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

### Notes
- Vite dev server proxies `/api` to `http://localhost:5000`
- Tailwind configured to match the purple/yellow Figma style.
