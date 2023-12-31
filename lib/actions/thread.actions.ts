"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string, 
    author: string,
    communityId: string | null, 
    path: string,

}

export async function createThread({ text, author, communityId, path }: Params ){
    connectToDB();

    const createdThread = await Thread.create({
        text,
        author,
        community: null, 
      });

    // update user model 

    await User.findByIdAndUpdate(author, {
        $push: { threads: createdThread._id }
    })

    revalidatePath(path);
}


export async function fetchPosts(pageNumber =  1, pageSize = 20){
    connectToDB();

    // calculate number of posts  to skip 
    const skipAmount = (pageNumber -1 ) * pageSize;


    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: 'desc' })
    .skip(skipAmount)
    .populate({ path: 'author', model: User })
    .populate({
        path: 'children',
        populate:{
            path:'author',
            model: User,
            select: "_id name parentId image"
        }
    })


    const totalPostsCount = await Thread.countDocuments({parentId: { $in: [null, undefined] } })

    const posts = await postsQuery.exec();

    const inNext = totalPostsCount > skipAmount + posts.length;

    return { posts, inNext }
    
}

// todo comments
export async function fetchThreadById( id: string ){
    connectToDB();

    try {


        // Todo: populate community 
        const thread = await Thread.findById(id)
        .populate({
            path:"author",
            model :User ,
            select :"name _id image"
        })

        .populate({
            path: 'children',
            populate: [
                {
                    path: "author",
                    model: User,
                    select: '_id id name parentId image'
                },
                {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: '_id id name parentId image'
                    }

                }
            ]
        }).exec();

        return thread;
        
    } catch (error: any) {
        throw new Error(`Error fetching thread: ${error.message}`)
    }
}


export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string
  ) {
    connectToDB();
  
    try {
      // Find the original thread by its ID
      const originalThread = await Thread.findById(threadId);
  
      if (!originalThread) {
        throw new Error("Thread not found");
      }
  
      // Create the new comment thread
      const commentThread = new Thread({
        text: commentText,
        author: userId,
        parentId: threadId, // Set the parentId to the original thread's ID
      });
  
      // Save the comment thread to the database
      const savedCommentThread = await commentThread.save();
  
      // Add the comment thread's ID to the original thread's children array
      originalThread.children.push(savedCommentThread._id);
  
      // Save the updated original thread to the database
      await originalThread.save();
  
      revalidatePath(path);
    } catch (err) {
      console.error("Error while adding comment:", err);
      throw new Error("Unable to add comment");
    }
  }
