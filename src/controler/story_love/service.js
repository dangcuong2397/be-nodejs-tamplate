const response = require('../base/response');
const modal = require('./story-modal');
async function listStory(req, res) {
    try {
        // hand databases
        let list = await modal.storis.findAll({
            raw: true,
            limit: 1000, 
            order: [ ['createDate',  'DESC'] ]
        });
        response.ok(res, list);
    } catch (error) {
        console.log(error);
        response.internal(res, error,'AD1001');
    }
}

async function createStory(req, res) {
    try {
        if(!req.body.createDate){
            req.body.createDate = new Date();
        }
        const checkUrl = req.body.imageUri ? ['.jpg','.png','.mp4'].includes(req.body.imageUri.slice(-4)) : true;
        if(!checkUrl){
            return response.badData(res,'Lỗi uri file','AD0202');
        }
        let add_adv = await modal.storis.create(
            {
                imageUri: req.body.imageUri,
                title: req.body.title,
                content: req.body.content,
                createDate: req.body.createDate,
            }
        )
        add_adv ? response.ok(res, add_adv) : response.internal(res, "Lỗi tạo story");
        return
    } catch (error) {
        console.log(error);
        if(res,error.errors){
            return response.badData(res,error.errors[0].message,'AD0201');
        }
        else{
            response.internal(res, error);
        }
    }
}

module.exports={
    listStory,
    createStory,
}
