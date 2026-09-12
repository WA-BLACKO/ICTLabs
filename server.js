import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json({
    limit: "1mb"
}));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Main.html"));
});



app.post(
    "/api/chat",

    async (req, res) => {

        try {

            const {
                messages,
                language
            } =
                req.body;


            if (
                !Array.isArray(messages)
            ) {

                return res
                    .status(400)
                    .send(
                        "Invalid messages."
                    );

            }


            const languageName = {

                en:
                    "English",

                si:
                    "Sinhala",

                ta:
                    "Tamil"

            }[language] || "English";


            const conversation =
                messages
                    .slice(-14)
                    .map(message => {

                        const role =
                            message.role === "assistant"
                                ? "Assistant"
                                : "Student";


                        return `${role}: ${message.content}`;

                    })
                    .join("\n\n");


            const response =
                await openai.responses.create({

                    model:
                        "gpt-5.6-luna",

                    instructions: `

You are ICT Lab AI, an educational assistant
for students studying Information and
Communication Technology.

You specialize in:

- Sri Lankan G.C.E. A/L ICT
- Computer architecture
- CPU and memory
- Number systems
- Binary, octal and hexadecimal
- Boolean algebra
- Logic gates
- Karnaugh maps
- Operating systems
- Networking
- IP addressing
- Subnetting
- Databases
- SQL
- Database normalization
- ER diagrams
- Programming
- Python
- Algorithms
- Flowcharts
- HTML
- CSS
- JavaScript
- Web technologies
- Information systems

Explain answers clearly and step-by-step
when necessary.

You are helping a student learn, so do not
just give an answer when explaining the
reasoning would help.

For calculations, show the important working.

For programming questions, give readable
code and explain it.

For MCQ questions, explain why the correct
answer is correct.

Reply primarily in ${languageName}.

If technical English terms are clearer,
you may include the English technical term
in brackets.

If the user asks something unrelated to ICT,
politely explain that your main purpose is
ICT education.

                    `,

                    input:
                        conversation

                });


            res.setHeader(
                "Content-Type",
                "text/plain; charset=utf-8"
            );


         

            const answer =
                response.output_text;


            const words =
                answer.split(/(\s+)/);


            let index =
                0;


            const sendChunk =
                () => {

                    if (
                        index >=
                        words.length
                    ) {

                        res.end();

                        return;

                    }


                    res.write(
                        words[index]
                    );


                    index++;


                    setTimeout(
                        sendChunk,
                        12
                    );

                };


            sendChunk();

        }

        catch (error) {

            console.error(
                "AI ERROR:",
                error
            );


            if (
                !res.headersSent
            ) {

                res
                    .status(500)
                    .send(
                        "Unable to generate an answer."
                    );

            }

            else {

                res.end();

            }

        }

    }

);




const PORT =
    process.env.PORT || 3000;


app.listen(
    PORT,
    () => {

        console.log(
            `ICT Lab running at http://localhost:${PORT}`
        );

    }
);