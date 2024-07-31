import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient()
dotenv.config({
  path: "./.env",
});
const app = express();
app.use(cors());
app.use(express.json());
app.post("/create-quiz",async(req,res)=>{
  const quiz = await client.quiz.create({
    data:{}
  });
  return res.json({quiz});
})
app.post("/add-problem", async(req, res) => {
  const body = req.body;//problem,quizId
  console.log(body);
  const problem = await client.problem.create({
    data:{
      question:body.question,
      option1:body.option1,
      option2:body.option2,
      option3:body.option3,
      option4:body.option4,
      correct:body.correct,
      quizId:body.quizId
    }
  })
  return res.json({
    problem
  })
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
