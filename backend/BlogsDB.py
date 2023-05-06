from model import Blog
#MongoDB driver
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')

blogs = client.blogList
_blog = blogs.blog


async def fetch_one_blog(id):
    document = await _blog.find_one({"id": id})
    return document

async def fetch_all_blogs():
    blogs = []
    cursor = _blog.find({})
    async for document in cursor:
        blogs.append(Blog(**document))
    return blogs

async def create_blog(Blog):
    document = Blog
    result = await _blog.insert_one(document)
    return document

async def update_blog(title, body, id):
    await _blog.update_one({"id": id}, {"$set": {
        "title": title,
        "body": body
    }})

    document = await _blog.find_one({"title": title, "body": body})
    return document

async def remove_blog(id):
    await _blog.delete_one({"id": id})
    return True