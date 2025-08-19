"use client"

import { useState, useEffect } from "react"
import { Trash2, Edit, Plus, X, Phone, MapPin, FileText, User } from "lucide-react"

export default function ContactsApp() {
  const [ismi, setIsmi] = useState("")
  const [raqami, setRaqami] = useState("")
  const [manzil, setManzil] = useState("")
  const [izoh, setIzoh] = useState("")
  const [formOpening, setFormOpening] = useState(false)
  const [editId, setEditId] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("users")
    if (saved) {
      setData(JSON.parse(saved))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!ismi.trim() || !raqami.trim() || !manzil.trim() || !izoh.trim()) return

    if (editId) {
      const updated = data.map((item) => (item.id === editId ? { ...item, ismi, raqami, manzil, izoh } : item))
      setData(updated)
      localStorage.setItem("users", JSON.stringify(updated))
      setEditId(null)
    } else {
      const newUser = {
        id: Date.now(),
        ismi,
        raqami,
        manzil,
        izoh,
      }
      const newData = [...data, newUser]
      setData(newData)
      localStorage.setItem("users", JSON.stringify(newData))
    }

    // Reset form
    setIsmi("")
    setRaqami("")
    setManzil("")
    setIzoh("")
    setFormOpening(false)
  }

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id)
    setData(filteredData)
    localStorage.setItem("users", JSON.stringify(filteredData))
  }

  const handleEdit = (item) => {
    setFormOpening(true)
    setEditId(item.id)
    setIsmi(item.ismi)
    setRaqami(item.raqami)
    setManzil(item.manzil)
    setIzoh(item.izoh)
  }

  const resetForm = () => {
    setFormOpening(false)
    setEditId(null)
    setIsmi("")
    setRaqami("")
    setManzil("")
    setIzoh("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Kontaktlar</h1>
          <button
            onClick={() => setFormOpening(true)}
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-4 sm:px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl active:bg-sky-500 flex items-center gap-2 justify-center"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Yangi kontakt qo'shish</span>
            <span className="sm:hidden">Qo'shish</span>
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-sky-600">
              <tr>
                <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Ism</th>
                <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Raqam</th>
                <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Manzil</th>
                <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Izoh</th>
                <th className="px-6 py-4 text-center text-white font-semibold">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 === 0 ? "bg-slate-50" : "bg-white"} hover:bg-slate-100 transition-colors duration-150`}
                >
                  <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700 capitalize">
                    {item.ismi}
                  </td>
                  <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700"><a href="tel:{item.raqami}">{item.raqami}</a></td>
                  <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700">{item.manzil}</td>
                  <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700">{item.izoh}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
                      >
                        <Edit size={18} className="text-yellow-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Ma'lumot topilmadi. Yangi yaratish uchun yuqoridagi tugmani bosing
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {data.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-sky-600" />
                  <h3 className="font-semibold text-slate-800 capitalize">{item.ismi}</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
                  >
                    <Edit size={16} className="text-yellow-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone size={16} />
                  <span className="text-sm">{item.raqami}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin size={16} />
                  <span className="text-sm">{item.manzil}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-600">
                  <FileText size={16} className="mt-0.5" />
                  <span className="text-sm">{item.izoh}</span>
                </div>
              </div>
            </div>
          ))}

          {data.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center">
              <p className="text-slate-500">
                Ma'lumot topilmadi. Yangi yaratish uchun yuqori burchakdagi tugmani bosing
              </p>
            </div>
          )}
        </div>

        {/* Modal Form */}
        {formOpening && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {editId ? "Kontaktni tahrirlash" : "Yangi kontakt qo'shish"}
                </h2>
                <button onClick={resetForm} className="text-slate-400 hover:text-slate-600 p-1">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Ismi</label>
                  <input
                    required
                    placeholder="Ismi"
                    value={ismi}
                    onChange={(e) => setIsmi(e.target.value)}
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Telefon raqami</label>
                  <input
                    required
                    placeholder="Telefon raqami"
                    value={raqami}
                    onChange={(e) => setRaqami(e.target.value)}
                    type="tel"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Manzili</label>
                  <input
                    required
                    placeholder="Manzili"
                    value={manzil}
                    onChange={(e) => setManzil(e.target.value)}
                    type="text"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Izoh</label>
                  <textarea
                    required
                    placeholder="Izoh"
                    value={izoh}
                    onChange={(e) => setIzoh(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 shadow-lg"
                  >
                    {editId ? "Yangilash" : "Yaratish"}
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
