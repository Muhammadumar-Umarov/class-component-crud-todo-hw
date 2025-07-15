import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Component } from "react"

export default class Todos extends Component {
  constructor() {
    super()
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      formOpening: false,
      data: [],
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (!this.state.firstName.trim()) return null
    if (!this.state.lastName.trim()) return null
    if (!this.state.email.trim()) return null
    if (!this.state.password.trim()) return null
    const newTodo = {
      id: Date.now(),
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    }
    this.setState({
      data: [...this.state.data, newTodo],
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      formOpening: false,
    })
  }

  // DELETE
  handleDelete = (id) => {
    const filteredData = this.state.data.filter((item) => item.id !== id)
    this.setState({ data: filteredData })
  }

  render() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="container mx-auto max-w-6xl">
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-slate-800">User Management System</h1>
            <button
              onClick={() => this.setState({ formOpening: true })}
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              + Add New User
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-sky-600">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">First Name</th>
                  <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Last Name</th>
                  <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Email</th>
                  <th className="px-6 py-4 text-left text-white font-semibold border-r border-sky-500">Password</th>
                  <th className="px-6 py-4 text-center text-white font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data?.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${index % 2 === 0 ? "bg-slate-50" : "bg-white"} hover:bg-slate-100 transition-colors duration-150`}
                  >
                    <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700 capitalize">
                      {item.firstName}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700 capitalize">
                      {item.lastName}
                    </td>
                    <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700">{item.email}</td>
                    <td className="px-6 py-4 border-r border-slate-200 font-medium text-slate-700">
                      {"•".repeat(item.password.length)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center gap-3 justify-center">
                        <button className="p-2 rounded-lg hover:bg-yellow-100 transition-colors duration-200">
                          <EditOutlined style={{ color: "#f59e0b", fontSize: "18px" }} />
                        </button>
                        <button
                          onClick={() => this.handleDelete(item.id)}
                          className="p-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
                        >
                          <DeleteOutlined style={{ color: "#ef4444", fontSize: "18px" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {this.state.data.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      No users found. Click "Add New User" button to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {this.state.formOpening && (  
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Add New User</h2>
                  <button
                    onClick={() => this.setState({ formOpening: false })}
                    className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={this.handleSubmit} action="" className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">First Name</label>
                      <input
                        required
                        placeholder="First Name"
                        value={this.state.firstName}
                        onChange={(e) => {
                          this.setState({ firstName: e.target.value })
                        }}
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Last Name</label>
                      <input
                        required
                        placeholder="Last Name"
                        value={this.state.lastName}
                        onChange={(e) => {
                          this.setState({ lastName: e.target.value })
                        }}
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <input
                      required
                      placeholder="Email"
                      value={this.state.email}
                      onChange={(e) => {
                        this.setState({ email: e.target.value })
                      }}
                      type="text"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <input
                      required
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(e) => {
                        this.setState({ password: e.target.value })
                      }}
                      type="password"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200 placeholder-slate-400 text-slate-700 outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => this.setState({ formOpening: false })}
                      className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 shadow-lg"
                    >
                      Add User
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
