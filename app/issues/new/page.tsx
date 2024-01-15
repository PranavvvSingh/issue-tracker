"use client"
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Controller, useForm } from "react-hook-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createIssueSchema } from "@/app/validationSchemas"
import { z } from "zod"
import ErrorMessage from "@/app/components/ErrorMessage"

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
   const router = useRouter()
   const [error, setError] = useState("")
   const {
      register,
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<IssueForm>({
      resolver: zodResolver(createIssueSchema),
   })
   return (
      <div className="max-w-xl">
         {error && (
            <Callout.Root color="red" className="mb-5">
               <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
         )}
         <form
            className="space-y-3"
            onSubmit={handleSubmit(async (data) => {
               try {
                  await axios.post("/api/issues", data)
                  router.push("/issues")
               } catch (error) {
                  setError("Unexpected error occurred")
                  console.log(error)
               }
            })}
         >
            <ErrorMessage>{errors.title?.message}</ErrorMessage>

            <TextField.Root>
               <TextField.Input placeholder="Title" {...register("title")} />
            </TextField.Root>

            <ErrorMessage>{errors.description?.message}</ErrorMessage>

            <Controller
               name="description"
               control={control}
               render={({ field }) => (
                  <SimpleMDE placeholder="Description" {...field} />
               )}
            />

            <Button>Submit New Issue</Button>
         </form>
      </div>
   )
}

export default NewIssuePage
