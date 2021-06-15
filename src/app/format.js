const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  if(isNaN(date)) return console.error("Erreur de format : "+ dateStr)
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
  const month = mo.charAt(0).toUpperCase() + mo.slice(1)
  return `${parseInt(da)} ${month.substr(0,3)}. ${ye.toString().substr(2,4)}`
}
 
export const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return "En attente"
    case "accepted":
      return "Accepté"
    case "refused":
      return "Refused"
  }
}

export const invertFormatDate = ( dateStr) => {
  let grouping
  try{
    let regex = /(?<day>[0-9]{0,2})[ ](?<month>[a-zA-Z]+)[.][ ](?<year>[0-9]{2})/
    grouping = dateStr.match(regex).groups
  } catch(e){
    console.log(e)
    return false
  }
  return new Date("20"+grouping.year, monthArr.indexOf(grouping.month), grouping.day );
}