// 1225 | Original Version Created by Green
function getproductdata(category = 'นักศึกษา') {
  var sheeturl = 'https://docs.google.com/spreadsheets/d/1E3RQ17raGUn_0fSb3Dl-mAqG6ubOk8N2Iuj2oOLHlRI/edit?usp=sharing'
  var sheetname = 'data'
  var psheet = gspandas.gsdataframe(sheeturl, sheetname)
  var pinfo = psheet.getrowdict('group', category)
  // Logger.log(pinfo)
  // for (var i = 0; i < pinfo.length; i++) {
  //   Logger.log(pinfo[i])
  // }

  return pinfo
}

function genproductflex(category, ncol = 3) {
  var pdata = getproductdata(category)
  var ncol = pdata.length
  var pflex = getmultipleflex(pdata, ncol)
  Logger.log(pdata.length)

  return pflex
}

function getproductflex(p_name,p_pic,p_id, altText = 'This is a Flex Message') {

  var flextemplate = {
    "type": "carousel",
    "contents": [
      {
        "type": "bubble",
        "size": "giga",
        "hero": {
          "type": "image",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "url": p_pic
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "text",
              "text": ' name :' + p_name,
              "wrap": true,
              "weight": "bold",
              "size": "xl"
            },
            {
              "type": "box",
              "layout": "baseline",
              "contents": [
                {
                  "type": "text",
                  "text": ' id :' + p_id,
                  "wrap": true,
                  "weight": "bold",
                  "size": "xl",
                  "flex": 0
                }
              ]
            }
          ]
        },
        "footer": {
          "type": "box",
          "layout": "vertical",
          "spacing": "sm",
          "contents": [
            {
              "type": "button",
              "style": "primary",
              "action": {
                "type": "uri",
                "label": "เพิ่มรายการ",
                "uri": "https://linecorp.com&quot"
              }
            }
          ]
        }
      }
    ]
  }

  var lineres = {}
  lineres['type'] = 'flex'
  lineres['altText'] = altText
  lineres['contents'] = flextemplate

  var lr = {
    "line_payload": [
      lineres
    ],
    "response_type": "object"
  }
  return lr
}

function doGet(request) {
  // Change Spread Sheet url
  var category = request.parameter.category
  var ncol = request.parameter.ncol
  // Logger.log(category,ncol)
  var result = genproductflex(category, ncol)
  // Logger.log(jo)
  result = JSON.stringify(result);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}

function getmenuflex(m_id,m_name,m_pic) {

  var flextemplate =
  {
    "type": "bubble",
    "size": "nano",
    "hero": {
      "type": "image",
      "url": m_pic,
      "size": "full",
      "aspectMode": "cover",
      "aspectRatio": "320:213",
      "action": {
        "type": "message",
        "label": "action",
        "text": m_id
      }
    },
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": " id " + m_id,
          "weight": "regular",
          "size": "xxs",
          "wrap": true,
          "margin": "none",
          "contents": []
        },
        {
          "type": "text",
          "text": " name " + m_name,
          "size": "xxs"
        }
      ],
      "spacing": "none",
      "paddingAll": "sm"
    }
  }

  return flextemplate
}

function getrowmenu(mlist) {
  var mltemp = []
  for (let m in mlist) {
    let m_name = mlist[m]['menu_name']
    let m_id = mlist[m]['menu_id']
    let m_pic = mlist[m]['menu_pic']
    var mtemp = getmenuflex(m_pic, m_name, m_id)
    mltemp.push(mtemp)
    Logger.log(mtemp)
  }
  return mltemp
}

function getmultipleflex(mlist, ncol = 1) {

  //let ncol = 3
  //let ncol = mlist.length
  let nrow = 1
  Logger.log("getmultipleflex " + ncol)
  Logger.log(nrow)
  let lpayloadList = []
  for (i = 0; i < nrow; i++) {
    let mltemp = []
    for (j = 0; j < ncol; j++) {
      let ind = i * ncol + j
      let m_name = mlist[ind]['name']
      let m_id = mlist[ind]['id']
      let m_pic = mlist[ind]['pic']
      var mtemp = getmenuflex(m_name,m_id,m_pic)
      mltemp.push(mtemp)
      //Logger.log(mtemp)
    }

    var flextemplate = {
      "type": "carousel",
      "contents": mltemp
    }

    var lineres = {}
    lineres['type'] = 'flex'
    lineres['altText'] = 'This is Flex message'
    lineres['contents'] = flextemplate
    lpayloadList.push(lineres)


  }

  var lr = {
    "line_payload": lpayloadList,
    "response_type": "object"
  }
  //Logger.log(lr)
  return lr
}

// 1224 | Old Version Created by NumWaan
/*
function getproductdata(category='นักศึกษา'){
  var sheeturl = 'https://docs.google.com/spreadsheets/d/1E3RQ17raGUn_0fSb3Dl-mAqG6ubOk8N2Iuj2oOLHlRI/edit?usp=sharing'
  var sheetname = 'data'
  var psheet = gspandas.gsdataframe(sheeturl,sheetname)
  var pinfo = psheet.getrowdict('group',category)
  Logger.log(pinfo)
  // for (var i = 0; i < pinfo.length; i++) {
  //   Logger.log(pinfo[i])
  // }
  return pinfo
}

function genproductflex(category,ncol=3){
  var pdata = getproductdata(category)
  // เอาตามความยาวที่อยู่ในชีท
  var ncol = pdata.length
  var pflex = getmultipleflex(pdata,ncol)
  Logger.log(pdata.length)

  return pflex
}

function getproductflex(p_name,p_pic,p_id,altText='This is a Flex Message'){

  var flextemplate = {
  "type": "carousel",
  "contents": [
    {
      "type": "bubble",
      "size": "giga",
      "hero": {
        "type": "image",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "url": p_pic
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "text",
            "text": ' P_NAME :' + p_name ,
            "wrap": true,
            "weight": "bold",
            "size": "xl"
          },
          {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "text",
                "text": ' P_ID :' + p_id ,
                "wrap": true,
                "weight": "bold",
                "size": "sm",
                "flex": 0
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "primary",
            "action": {
              "type": "uri",
              "label": "เพิ่มรายการ",
              "uri": "https://linecorp.com"
            }
          }
        ]
      }
    }
  ]
}

  var lineres = {}
  lineres['type'] = 'flex'
  lineres['altText'] = altText
  lineres['contents'] = flextemplate

  var lr = {
  "line_payload":[
      lineres
    ],
  "response_type": "object"
  }
  return lr
}

function doGet(request){
 // Change Spread Sheet url
 var category = request.parameter.category
 var ncol = request.parameter.ncol
 // Logger.log(category,ncol)
 var result = genproductflex(category,ncol)
 // Logger.log(jo)
 result = JSON.stringify(result);
 return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}

function getmenuflex(m_id,m_name,m_pic){

    var flextemplate =
    {
      "type": "bubble",
      "size": "nano",
      "hero": {
        "type": "image",
        "url": m_pic,
        "size": "full",
        "aspectMode": "cover",
        "aspectRatio": "320:213",
        "action": {
          "type": "message",
          "label": "action",
          "text": m_id
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": " M_ID " + m_id,
            "weight": "regular",
            "size": "xxs",
            "wrap": true,
            "margin": "none",
            "contents": []
          },
          {
            "type": "text",
            "text": " M_NAME " + m_name,
            "size": "xxs"
          }
        ],
        "spacing": "none",
        "paddingAll": "sm"
      }
    }

return flextemplate
}

function getrowmenu(mlist){
  var mltemp = []
  for (let m in mlist){
    let m_name = mlist[m]['menu_name']
    let m_id = mlist[m]['menu_id']
    let m_pic = mlist[m]['menu_pic']
    var mtemp = getmenuflex(m_pic,m_name,m_id)
    mltemp.push(mtemp)  
  }
  return mltemp
}

function getmultipleflex(mlist, ncol = 1) {
 
  //let ncol = 3
  //let ncol = mlist.length
  let nrow = 1
  Logger.log("getmultipleflex " + ncol)
  Logger.log(nrow)
  let lpayloadList = []
  for (i = 0; i < nrow; i++){
    let mltemp = []
    for (j=0; j< ncol; j++){
      let ind = i*ncol + j
      let m_name = mlist[ind]['name']
      let m_id = mlist[ind]['id']
      let m_pic = mlist[ind]['pic']
      var mtemp = getmenuflex(m_name,m_id,m_pic)
      mltemp.push(mtemp)
      //Logger.log(mtemp)
    }
   
    var flextemplate = {
    "type": "carousel",
    "contents": mltemp
    }

    var lineres = {}
    lineres['type'] = 'flex'
    lineres['altText'] = 'This is Flex message'
    lineres['contents'] = flextemplate
    lpayloadList.push(lineres)


  }

  var lr = {
  "line_payload": lpayloadList,
  "response_type": "object"
  }
  //Logger.log(lr)
  return lr
}
*/