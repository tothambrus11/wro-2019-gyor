<div class="container">
	<h2>Offer</h2>
	<p>
		You can offer your unnecessary goods here. As soon as you offered it, a self-driving car will go to your house
		and transport the goods to the warehouse or to someone who ordered it. In this way, your ecological footprint
		will be reduced.
	</p>
	<form method="post" action="<?php echo base_url("offer/do_offer") ?>">
		<div class="form-group row">
			<label for="nameOfThing" class="col-sm-3 col-form-label">
				Name of the thing:
			</label>
			<div class="col-sm-9">
				<input required name="thing_name" class="form-control" id="nameOfThing" type="text"
					   placeholder="Name of thing">
			</div>
		</div>

		<div class="form-group row">
			<label class="col-sm-3 col-form-label">
				Your location:
			</label>

			<label for="posX" class="col-sm-auto col-form-label">
				X:
			</label>
			<div class="col-sm-auto">
				<input required id="posX" name="pos_x" class="form-control" style="width: 70px" min="0" type="number"
					   value="0">
			</div>

			<label for="posY" class="col-sm-auto col-form-label">
				Y:
			</label>
			<div class="col-sm-auto">
				<input required id="posY" name="pos_y" class="form-control" style="width: 70px" min="0" type="number"
					   value="0">
			</div>

			<label for="selectDir" class="col-sm-auto col-form-label">
				Direction:
			</label>
			<div class="col-sm-auto">
				<select required name="dir" class="form-control" id="selectDir">
					<option value="horizontal">Horizontal |</option>
					<option value="vertical">Vertical --</option>
				</select>
			</div>
		</div>

		<div class="form-group row">
			<label for="thingDetails" class="col-sm-3 col-form-label">
				Details:
			</label>
			<div class="col-sm-9">
				<textarea required minlength="2" id="thingDetails" name="details" class="form-control"
						  placeholder="Details..."></textarea>
			</div>
		</div>

		<div class="form-group row">
			<div class="col-sm-3">
				<input type="submit" value="Offer" class="btn btn-primary">
			</div>
		</div>
	</form>
</div>
