<div class="container">
	<h1>Order</h1>
	<p>
		You can pick an item from this list and order it. A self-driving car will bring the goods to your house. You
		will be notified by an email.
	</p>
	<form onchange="loadView(getOffers($('#order-by').val(), $('#order').val()))">
		<label for="">Sort: </label>
		<select id="order-by" class="form-control d-inline-block" style="width: auto !important;">
			<option value="offer_date">Offer date</option>
		</select>
		<select id="order" class="form-control d-inline-block" style="width: auto !important;">
			<option value="ASC">Ascending ^</option>
			<option value="DESC">Descending v</option>
		</select>
		<br>
	</form>
	Your location:
	<label for="x">
		x:
	</label>
	<input id="x" type="number" value="0" min="0" max="6" class="form-control d-inline-block w-auto">

	<label for="y">
		y:
	</label>
	<input id="Y" type="number" value="0" min="0" max="6" class="form-control d-inline-block w-auto">

	<br>
	<label for="isUrgent">My order is urgent <input id="isUrgent" type="checkbox"></label>

	<div id="order-container" class="grid">

	</div>
</div>
<script>
	var base_url = "<?php echo base_url(); ?>";
</script>
<script src="<?php echo js_url('masonry.pkgd.min.js'); ?>"></script>

<script src="<?php echo js_url("order-form.js"); ?>"></script>
<style>
	.grid-item {
		float: left !important;
		width: 300px;
		border: 2px solid hsla(0, 0%, 0%, 0.5);
	}
</style>
