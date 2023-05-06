from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from BlogsDB import *

app = FastAPI(debug=True)

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return{"Ping" : "Pong"}

@app.get("/api/blog")
async def get_all_blog():
    response = await fetch_all_blogs()
    return response

@app.get("/api/blog{id}", response_model=Blog)
async def get_blog_by_id(id: str):
    response = await fetch_one_blog(id)
    if response:
        return response
    else:
        raise HTTPException(404, f"There is no blog with this id {id}")

@app.post("/api/blog", response_model=Blog)
async def post_blog(blog:Blog):
    try:
        response = await create_blog(blog.dict())
        if response:
            return response
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))

@app.put("/api/blog{id}/", response_model=Blog)
async def put_blog(id: str, body: str, title: str):
    response = await update_blog(title, body, id)
    if response:
        return 1
    else:
        raise HTTPException(404, f"There is no blog with this id {id}")

@app.delete("/api/blog{id}")
async def delete_blog(id: str):
    response = await remove_blog(id)
    if response:
        return "Succesfully deleted blog"
    else:
        raise HTTPException(404, f"There is no blog with this id {id}")