import os
from typing import Any, Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient

# 1. Initialize our lovely app!
app = FastAPI()

# 2. Add CORS so your React app can talk to Python safely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017/")
client = MongoClient(mongo_url)
db = client["tag_tree_db"]
collection = db["trees"]

class TreeData(BaseModel):
    tree: Dict[str, Any]

@app.post("/api/tree")
def save_tree(data: TreeData):
    result = collection.insert_one(data.tree)
    return {"message": "Tree saved successfully!", "id": str(result.inserted_id)}

@app.get("/api/trees")
def get_trees():
    trees = list(collection.find({}, {"_id": 0}))
    return {"trees": trees}