const axios = require('axios')
const moment = require('moment')
// const _ = require('lodash');
var _ = require('underscore');

let dataarray
let getAdata = async () => {
    let datas = await axios.get('http://localhost:2000/api/v1/posts')
    dataarray = datas.data.data.posts
    // console.log(dataarray)
    // let sorted = dataarray.sort((a, b) => new Date(a.date) - new Date(a.date))
    // console.log(sorted)
    let dateArray = []
    // dataarray.forEach(el => {
    //     moment(el.date, "YYYY-MM-DDThh:mm:ss").fromNow()
    //     dateArray.push(moment(el.date, "YYYY-MM-DDThh:mm:ss").fromNow())
    // });
    // console.log(dateArray)
    let sorted = dateArray.sort((a, b) => new Date(b.date) - new Date(a.date))
    // console.log(sorted)
    dataarray.forEach(el => {
        moment(el.date, "YYYY-MM-DDThh:mm:ss").fromNow()
        dateArray.push(moment(el.date, "YYYY-MM-DDThh:mm:ss").fromNow())
    });
    // console.log(dateArray)



    // the catagories 
    // let catagoriesArray = []
    // dataarray.forEach(el => {

    //     catagoriesArray.push(Object.keys(el.categories))
    // })

    // let datamerge = _.reduceRight(catagoriesArray, function (a, b) { return a.concat(b); }, [])

    // console.log(_.uniq(datamerge))


    //filter Post 

    class filterbyCatagories {
        constructor(dataArray) {
            this.data = dataArray;

        }

        //fitered catagory
        filterBycatagory(catagory) {
            let findaindex = []
            let sortedCatagoryArray = []

            let filterArray = this.data.map((el) => {
                let data = Object.keys(el.categories).includes(catagory)
                return data
            })
            filterArray.forEach((el, index) => {
                if (el === true) {
                    sortedCatagoryArray.push(this.data[index])
                }
            })
            return sortedCatagoryArray
        }

        //get catagory

        getcatagories() {
            let fullarray = [];
            let filterdecatagories

            this.data.forEach(el => {
                fullarray.push(Object.keys(el.categories))
            })

            filterdecatagories = _.reduceRight(fullarray, function (a, b) { return a.concat(b); }, [])
            let retunrArray = _.uniq(filterdecatagories)
            return retunrArray
        }
        //Catagory Count
        catagorycounthandler(catagory) {
            let findaindex = []
            let sortedCatagoryArray = []

            let filterArray = this.data.map((el) => {
                let data = Object.keys(el.categories).includes(catagory)
                return data
            })
            filterArray.forEach((el, index) => {
                if (el === true) {
                    sortedCatagoryArray.push(this.data[index])
                }
            })
            let count = sortedCatagoryArray.length
            return count
        }

        getcattagorycount() {
            let catagory = this.getcatagories()
            let catagoryCount = []
            catagory.forEach((el) => {
                catagoryCount.push({ Catagory: el, Count: this.catagorycounthandler(el) })
            })
            return catagoryCount
        }

    }




    let filtered = new filterbyCatagories(dataarray)

    //filterdcatagorydata
    let maindatafilterdcatagory = filtered.filterBycatagory("App Features")
    //Get Catagories and count 
    let arrayBYcount = filtered.getcattagorycount().sort((a, b) => b.Count - a.Count)
    console.log(arrayBYcount)


    // let filterbycatagories = dataarray.map((el) => {

    //     let data = Object.keys(el.categories).includes("Tech")

    //     return data
    // })

    // console.log(filterbycatagories)
    // let indexes = []
    // filterbycatagories.forEach((el, index) => {
    //     if (el === true) {
    //         indexes.push({ el: el, indexNo: index })
    //     }
    // })


    // console.log(indexes)
    // let catagoriesSortedArray = []
    // let sortedBycatagories = indexes.map((el) => {
    //     catagoriesSortedArray.push(dataarray[el.indexNo])
    // })


    // console.log(catagoriesSortedArray.length)




    //







    return dataarray

}


getAdata();
