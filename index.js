import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient()
dotenv.config({
  path: "./.env",
});
const app = express();

app.post("/create-quiz",async(req,res)=>{
  const quiz = await client.quiz.create({});
  return res.json({quiz});
})
app.post("/add-problem", async(req, res) => {
  const body = req.body;//problem,quizId
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
