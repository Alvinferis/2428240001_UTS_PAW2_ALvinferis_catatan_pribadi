import z from 'zod'

export const storeCatatanSchema = z.object({
  title: z.string().trim().min(1, 'Title wajib diisi'),
  content: z.string().trim().min(1, 'Content wajib diisi'),
  category: z.string().trim().min(1, 'Category wajib diisi'),
})

export const updateCatatanSchema = z.object({
  title: z.string().trim().min(1, 'Title wajib diisi'),
  content: z.string().trim().min(1, 'Content wajib diisi'),
  category: z.string().trim().min(1, 'Category wajib diisi'),
})