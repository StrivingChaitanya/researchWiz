import { getPaperPath, getPapers , recPaper ,getRec} from "../services/paperFunc.js"
import { addComments } from "../services/userFunc.js"

//serachPaper searching for paper based on filter in dbs from frontend   
const searchPaper = async (req, res) => {
    let searchTerm = req.query.keyword
    let filter = req.query.filter
    if(!searchTerm){
        res.status(400).json("Invalid Input")
        return;
    }
    if(searchTerm.trim().length === 0){
        console.log(searchTerm + "hello")
       res.status(400).json("Invalid Input");
        return;
    }
    let possiblefilters = ['title','year','author'];
    if(!possiblefilters.includes(filter)){
        res.status(400).json("Invalid filter");
        return;
    }
    let result = await getPapers(searchTerm,filter);
    res.status(200).json(result);
    return;
};

//post
//addComment using email and comment based on email  from frontend
const addComment = async(req,res) => {
    let comment = req.body['comment'];
    let email = req.body['email'];
    let paper_id = req.body['paper_id'];
    if(!comment || !email){
        res.status(400).json("Invalid Input");
        return;
    }
    if(comment.trim().length === 0 || email.trim().length === 0){
        res.status(400).json("Invalid Input");
        return;
    }
    let result = await addComments(email,comment,paper_id) ;
    if(!result){
        res.status(400).json("unsucessful");
        return;
    }
    res.status(200).json(result);
    return;
};

//get
//recommendPaper using email through history and comments
const recommendPaper = async(req,res) => {
    let email = req.query.email;
    console.log(email);
    if(!email){
        res.status(400).json([]);
        return;
    }
    if(email.trim().length === 0){
        res.status(400).json([]);
        return;
    }
    let result = await recPaper(email);
    if(!result){
        res.status(400).json([]);
        return;
    }
    res.status(200).json(result);
    return;
};

//post
//addHist using emal and addHist based on email from frontend

// Send the paper matched according to the title sent as query param 
const sendPaper = async (req, res) => {
  const title = req.params.title;
  const __dirname = '../pdfs';
  const metaData = await getPapers(title, 'title');
  if (metaData.length > 1) {
    res.status(401).json("Invalid Input");
    return;
  }

    // file_path of kind 
  const f_path = metaData['file_path']; 
  const pdfPath = path.join(__dirname, f_path);

  const [f_name] = f_path.split('/').slice(-1)

  // Set the response headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=${f_name}`);

  // Send the PDF file
  res.sendFile(pdfPath);
};

const recentPaper = async(req,res) => {
    const email = req.query.email
    if(!email){
        res.status(400).json("Invalid Input");
        return;
    }
    if(email.trim().length === 0){
        res.status(400).json("Invalid Input");
        return;
    }
    let result = await getRec(email);
    res.status(200).json(result);
    return;
}

export {searchPaper, addComment, recommendPaper, sendPaper  ,recentPaper};
