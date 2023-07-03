const validateTitle = (req, res, next) =>{
    const {body} = req;

    if(body.title === undefined){
        return res.status(400).json({message: 'O compo "Titulo" ele é obrigatorio'})
    };
    if(body.title === ''){
        return res.status(400).json({message: 'O compo "Titulo" não pode ser vazio'})
    };

    next();
};

const validateStatus = (req, res, next) =>{
    const {body} = req;

    if(body.status === undefined){
        return res.status(400).json({message: 'O compo "Status" ele é obrigatorio'})
    };
    if(body.status === ''){
        return res.status(400).json({message: 'O compo "Status" não pode ser vazio'})
    };

    next();
}

module.exports = {
    validateTitle,
    validateStatus,
};
