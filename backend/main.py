import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel
from typing import Dict, Any
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import HTTPException

app = FastAPI()

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
    trees = []
    for doc in collection.find():
        doc_id = str(doc.pop("_id")) 
        trees.append({"id": doc_id, "tree": doc})
    return {"trees": trees}

@app.put("/api/tree/{tree_id}")
def update_tree(tree_id: str, data: TreeData):
    try:
        object_id = ObjectId(tree_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid tree id")

    result = collection.replace_one({"_id": object_id}, data.tree)
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Tree not found")

    return {"message": "Tree updated successfully!", "id": tree_id}