const calculatePeroid =(date1,date2)=>{
    const data1=new Date(date1)
    const data2=new Date(date2)
    const peroid =   data2.getHours()-data1.getHours()
    return peroid
}
module.exports={calculatePeroid}