let ejsExcel = require('ejsexcel')
let xlsx = require('node-xlsx')
let fs = require('fs')

// data.push(["序号","姓名","身份证号码","手机号码","学历","执裁项","裁判员等级","裁判员证书编号","发证时间","注册（是/否）","民族","籍贯","政治面貌","外语语种","外语水平","常住地址","工作单位"])
init()

function init() {
  let exBuf = fs.readFileSync(__dirname + '/resource/association_20210927.xlsx')

  ejsExcel
    .getExcelArr(exBuf)
    .then((exlJson) => {
      console.log('************  read success:getExcelArr')
      let workBook = exlJson
      let workSheets = workBook[0]

      let data = []
      let head = []

      workSheets.forEach((row, i) => {
        if (i) {
          const obj = {}
          row.forEach((item, index) => {
            obj[head[index]] = item
          })

          data.push(obj)
        } else {
          head = row
        }
      })

      formatData(data)
    })
    .catch((error) => {
      console.log('************** had error!')
      console.log(error)
    })
}

function formatData(data) {
  const arr = []

  data.forEach((row) => {
    const i = arr.findIndex((item) => {
      return item.title == row.title
    })

    if (~i) {
      arr[i].data.push([
        arr[i].data.length,
        row.uname,
        row.idcard,
        row.mobile,
        row.education,
        row.item,
        row.level_name,
        row.certificate_no,
        '-/-',
        row.register,
        row.nation,
        row.native_place,
        row.political_status,
        row.foreign_language,
        row.foreign_level,
        row.address,
        row.work_addr,
      ])
    } else {
      const obj = {
        title: row.title,
        data: [
          [
            '序号',
            '姓名',
            '身份证号码',
            '手机号码',
            '学历',
            '执裁项',
            '裁判员等级',
            '裁判员证书编号',
            '发证时间',
            '注册（是/否）',
            '民族',
            '籍贯',
            '政治面貌',
            '外语语种',
            '外语水平',
            '常住地址',
            '工作单位',
          ],
        ],
      }

      obj.data.push([
        obj.data.length,
        row.uname,
        row.idcard,
        row.mobile,
        row.education,
        row.item,
        row.level_name,
        row.certificate_no,
        '-/-',
        row.register,
        row.nation,
        row.native_place,
        row.political_status,
        row.foreign_language,
        row.foreign_level,
        row.address,
        row.work_addr,
      ])

      arr.push(obj)
    }
  })

  // console.log(arr.length)

  arr.forEach((row) => {
    exportExcel(row)
  })
}

function exportExcel(row) {
  const data = [
    {
      name: 'sheet1',
      data: row.data,
    },
  ]

  // 写xlsx
  const buffer = xlsx.build(data)
  fs.writeFile('./dist/' + row.title + '.xlsx', buffer, function (err) {
    if (err) throw err
    console.log(row.title + '，共' + row.data.length + '条数据，导出成功')

    // 读xlsx
    // var obj = xlsx.parse('./dist/' + 'resut.xlsx')
    // console.log(JSON.stringify(obj))
  })
}
