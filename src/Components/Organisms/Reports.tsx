import CardConatiner from '@Components/Atoms/CardContainer'
import Container from '@Components/Atoms/Container'
import Text from '@Components/Atoms/Text'
import { colors } from '@Utils/Color/colors'
import React, { useCallback, useEffect } from 'react'
import { Icons } from '@Components/Atoms/Icons'
import Button from '@Components/Atoms/Button'
import { getRequestWithStatus } from '@Api/index'
import { deleteReport, getReports } from '@Redux/Slices/ReportSlice'
import { useAppDispatch, useAppSelector } from '@Redux/Hooks'
import { languageData, reportData } from '@Redux/MemoizedSelectors'

const Reports = ({ order_id }) => {
    const dispatch = useAppDispatch()
    const reports = useAppSelector(reportData)
    const { Report_Card } = useAppSelector(languageData)
    const { languageType } = useAppSelector(state => state.user)
    const fetchData = useCallback(async () => {
        const data = await getRequestWithStatus(`Order/Complain/get_complain/${order_id}`)
        if (data.status) {
            dispatch(getReports(data.data))
        } else {
            console.log("Error")
        }
    }, [order_id])
    useEffect(() => {
        fetchData()
        return () => null
    }, [fetchData])

    console.log("object")
    return (
        reports ? reports.map((item, index) => (
            <CardConatiner key={index} padd="10px" justify="space-between" direction="column" height="150px" width="90%">
                <Container justify="space-between" >
                    <Text fontWeight="bold" color={colors.gray} >{Report_Card[languageType].Report_type}: <Text>{item.report_type}</Text></Text>
                    <Icons onPress={async () => dispatch(deleteReport(index))} color={colors.red} size={20} name="delete" />
                </Container>
                <Container justify="flex-start">
                    <Text>{item.complain}</Text>
                </Container>
                <Container justify="space-between">
                    <Button height="40px" text={item.status} />
                    <Text fontWeight="bold" color={colors.gray} >{Report_Card[languageType].Date} <Text color={colors.secondary}>{item.date ? item.date : "09/11/2021, 4:40"}</Text></Text>
                </Container>
            </CardConatiner>
        )) : (
            <Container height="50px">
                <Text>No reports to show</Text>
            </Container>
        )

    )
}

export default React.memo(Reports)
