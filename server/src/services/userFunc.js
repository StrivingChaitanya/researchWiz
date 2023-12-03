import HistModel  from "../models/HistSchema.js";
import PaperModel from "../models/PaperSchema.js";
import UserModel from "../models/UserSchema.js";
import CommentModel from "../models/CommentSchema.js"

const addComments = async(email,comment,paperid) => {
    const db = CommentModel;
    try {
        await db.updateOne(
            {email : email, paper_id : paperid},
            {$push : { comments : comment}},
            {upsert: true})
        return true;
    }
    catch(err){
        return false;
    }
};

const addHistory = async(email,paperid) => {
    const db = HistModel; 

    let dbquery = await db.find({
        "email" : email,
        "paper_id" : paperid,
    });
    
    console.log(dbquery.length)
    if(dbquery.length === 0){
        try{
            await db.create({
                "email" : email,
                "paper_id" : paperid,
            })
            return true;
        }
        catch(err){
            return false;
        }
    }

    await db.updateOne({
        "email": email,
        "paper_id": paperid,
        updatedAt: new Date(),
    });

    return true;
};

const getHistory = async(email) => {
    const db = HistModel;
    let query = await db.find({
        "email" : email,
    });

    let result = []
    let p_res = {}
    for(i in query){
        try {
            p_res = await db.findOne({paper_id: i.paper_id});
            result.push(p_res.title);
        } catch (err) {
            console.log(`Fetching of ${i.paper_id} failed`);
        }
    }

    return result;
}

const getName = async (email) => {
    const db = UserModel;
    let query = await db.findOne({
        "email": email,
    });
    return query;
};

export {  getHistory , addComments , addHistory, getName  };

