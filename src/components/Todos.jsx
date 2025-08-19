import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Component } from "react"

export default class Todos extends Component {
  constructor() {
    super()
    this.state = {
      ismi: "",
      raqami: "",
      manzil: "",
      izoh: "",
      formOpening: false,
      editUser: [],
      editId: null,
      data: [],
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { ismi, raqami, manzil, izoh, editId, data } = this.state

    if (!ismi.trim() || !raqami.trim() || !manzil.trim() || !izoh.trim()) return null

    if (editId) {
      const updated = data.map((item) => (
        item.id === editId
          ? { ...item, ismi, raqami, manzil, izoh }
          : item
      ))
      this.setState({
        data: updated,
        editId: null,
        ismi: "",
        raqami: "",
        manzil: "",
        izoh: "",
        formOpening: false,
      })
    } else {
      const newUser = {
        id: Date.now(),
        ismi,
        raqami,
        manzil,
        izoh
      }
      const newData = [...data, newUser]
      this.setState({
        data: newData,
        ismi: "",
        raqami: "",
        manzil: "",
        izoh: "",
        formOpening: false,
      })

      localStorage.setItem("users", JSON.stringify(newData))
    }
  }
  componentDidMount() {
    const saved = localStorage.getItem("users")
    if (saved) {
      this.setState({ data: JSON.parse(saved) })
    }
  }
  // DELETE
  handleDelete = (id) => {
    const filteredData = this.state.data.filter((item) => item.id !== id)

    this.setState({ data: filteredData }, () => {
      localStorage.setItem("users", JSON.stringify(this.state.data))
    })
  }

  render() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="container mx-auto max-w-6xl">

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Kontaktlar</h1>
            <button
              onClick={() => this.setState({ formOpening: true })}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl active:bg-sky-500"
            >
              + Yangi kontakt qo'shish
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-sky-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Ism</th>
                  <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Raqam</th>
                  <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Manzil</th>
                  <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Izoh</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Tahrirlash/O'chirish</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data?.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${index % 2 === 0 ? "bg-slate-150" : "bg-white"} hover:bg-slate-100 transition-colors duration-150`}
                  >
                    <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700 capitalize">
                      {item.ismi}
                    </td>

                    <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700">{item.raqami}</td>
                    <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700">{item.manzil}</td>
                    <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700">
                      {item.izoh}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center gap-3 justify-center">
                        <button
                          onClick={() =>
                            this.setState({
                              formOpening: true,
                              editId: item.id,
                              ismi: item.ismi,
                              raqami: item.raqami,
                              manzil: item.manzil,
                              izoh: item.izoh
                            })
                          }
                          className="p-2 rounded-lg hover:bg-yellow-100 transition-colors duration-200">
                          <EditOutlined style={{ color: "#f59e0b", fontSize: "18px" }} />
                        </button>
                        <button
                          onClick={() => this.handleDelete(item.id)}
                          className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200 cursor-pointer"
                        >
                          <DeleteOutlined style={{ color: "#ef4444", fontSize: "20px" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {this.state.data.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      Ma'lumot topilmadi. Yangi yaratish uchun yuqori burchakdagi tugmani bosing
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {this.state.formOpening && (
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Yangi kontakt qo'shish</h2>
                  <button
                    onClick={() => this.setState({ formOpening: false })}
                    className="text-slate-400 hover:text-slate-600 text-2xl font-bold cursor-pointer"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={this.handleSubmit} action="" className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Ismi</label>
                      <input
                        required
                        placeholder="Ismi"
                        value={this.state.ismi}
                        onChange={(e) => {
                          this.setState({ ismi: e.target.value })
                        }}
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Telefon raqami</label>
                    <input
                      required
                      placeholder="Telefon raqami"
                      value={this.state.raqami}
                      onChange={(e) => {
                        this.setState({ raqami: e.target.value })
                      }}
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Manzili</label>
                    <input
                      required
                      placeholder="Manzili"
                      value={this.state.manzil}
                      onChange={(e) => {
                        this.setState({ manzil: e.target.value })
                      }}
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Izoh</label>
                    <input
                      required
                      placeholder="Izoh"
                      value={this.state.izoh}
                      onChange={(e) => {
                        this.setState({ izoh: e.target.value })
                      }}
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => this.setState({ formOpening: false })}
                      className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Bekor qilish
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 shadow-lg"
                    >
                      Yaratish
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
