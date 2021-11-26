import { createSlice } from "@reduxjs/toolkit"

const ReportSlice = createSlice({
    name: "report",
    initialState: {
        report: {
            status: false,
        },
        reports: []
    },
    reducers: {
        toogleReport: (state) => {
            const newState = { ...state.report }
            newState["status"] = !newState.status
            state.report = newState
        },
        getReports: (state, action) => {
            state.reports = action.payload
        },
        deleteReport: (state, action) => {
            state.reports.splice(action.payload, 1)
        }
    }
})
export const { toogleReport, getReports, deleteReport } = ReportSlice.actions
export default ReportSlice.reducer