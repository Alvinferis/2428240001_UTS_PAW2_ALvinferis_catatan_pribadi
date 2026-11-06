import CatatanModel from '../model/catatan.model.js'
import {
  storeCatatanSchema,
  updateCatatanSchema,
} from '../schemas/catatan.schema.js'
import {
  apiResponse,
  apiResponseValidation,
} from '../utils/response.js'

class CatatanController {
  
  static async index(req, res) {
 const { search, sortBy = 'createdAt', order = 'asc' } = req.query

 const allowedSortFields = [
     'title',    'content',
      'category',
      'createdAt',
      'updatedAt',
    ]

    const sortField = allowedSortFields.includes(sortBy)  ? sortBy
      : 'createdAt'

    const sortOption = {
      [sortField]: order === 'desc' ? -1 : 1,
    }

    const filter = {}

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },  { content: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ]
    }

    const catatan = await CatatanModel.find(filter).sort(sortOption)

    return apiResponse({ res,
      status: 200,
      message: 'List Catatan',
      data: catatan,
    })
  }


  static async show(req, res) {
    const catatanId = req.params.id

    const catatan = await CatatanModel.findById(catatanId)

    if (!catatan) {
      return apiResponse({ res,
        status: 404,
        message: 'Catatan tidak ditemukan',
        data: null,
      })
    }

    return apiResponse({
      res,status: 200,
      message: 'Detail Catatan',
      data: catatan,
    })
  }


  static async store(req, res) {
    const result = storeCatatanSchema.safeParse(req.body)

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      })
    }

    const { title, content, category } = result.data

  const catatan = await CatatanModel.create({
      title, content,
      category,
    })

    return apiResponse({
      res,
      status: 201,
      message: 'Catatan berhasil dibuat',  data: catatan,
    })
  }


  static async update(req, res) {
    const catatanId = req.params.id

    const result = updateCatatanSchema.safeParse(req.body)

    if (!result.success) {
      return apiResponseValidation({    res,
        errors: result.error,
      })
    }

    const catatan = await CatatanModel.findById(catatanId)

    if (!catatan) {
      return apiResponse({
        res,
        status: 404, message: 'Catatan tidak ditemukan',
        data: null,
      })
    }

    const { title, content, category } = result.data

    const updateCatatan = await CatatanModel.findByIdAndUpdate(
      catatanId,
      {
        title, content,
        category,
      },
      {
        new: true,
      },
    )

    return apiResponse({
      res,
      status: 200,    message: 'Catatan berhasil diupdate',
      data: updateCatatan,
    })
  }


  static async delete(req, res) {
    const catatanId = req.params.id

    const catatan = await CatatanModel.findByIdAndDelete(catatanId)

    if (!catatan) {
      return apiResponse({
        res,
        status: 404,    message: 'Catatan tidak ditemukan',
        data: null,
      })
    }

    return apiResponse({
      res,
      status: 200,
      message: 'Catatan berhasil dihapus',
      data: null,
    })
  }
}

export default CatatanController