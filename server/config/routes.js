module.exports = function Route(app, Deer){
	var errors = [];
	app.get('/', function(req, res) {
	    Deer.find({}, function(err, deer) {
	      res.render('index', {errors: errors, deer: deer});
	    })
	})
	app.get('/deer/new', function(req, res){
		res.render('new_deer', {errors: errors});
	})
	app.get('/deer/:id', function(req, res){
		console.log('in get')
		Deer.findOne({_id: req.params.id}, function(err, deer){
			console.log('GGG: '+deer)
			res.render('deer', {deer: deer});
		})
	})
	app.get('/deer/:id/edit', function(req, res){
		Deer.findOne({_id: req.params.id}, function(err, deer){
			res.render('edit_deer', {deer: deer});
		})
	})
	app.post('/deer', function(req, res){
		deer = new Deer({name: req.body.name, weight: req.body.weight, color: req.body.color});
		console.log('in deer post', deer);
		deer.save(function(err){
			console.log('error in deer post method', err);
			if(err){
				// res.render('index', {error: deer.errors})
				for(var x in err.errors){
					errors.push(err.errors[x].message);
				}
				res.redirect('/deer/new');
			}
			else {
				res.redirect('/');
			}
		})
	})
	app.post('/deer/:id', function(req, res){
		console.log('ZZZ; '+req.params.id)
		Deer.update({_id: req.params.id}, {name: req.body.name, weight: req.body.weight, color: req.body.color}, function (err, deer){
			res.redirect('/');
		})
	})
	app.post('/deer/:id/delete', function(req, res){
		Deer.remove({_id: req.params.id}, function (err, user){
			res.redirect('/');
		})
	})
};