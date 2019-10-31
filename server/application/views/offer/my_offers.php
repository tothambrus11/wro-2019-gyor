<?php
/**
 * Created by Ambrus Tóth.
 * Date: 2019. 04. 18.
 * Time: 17:29
 */
?>
<div class="container">
    <h2>My offers</h2>
    <form onchange="loadView(getOffers($('#order-by').val(), $('#order').val()))">
        <label for="">Sort: </label>
        <select id="order-by" class="form-control d-inline-block" style="width: auto !important;">
            <option value="offer_date">Offer date</option>
            <option value="order_date">Order date</option>
            <option value="delivery_date">Delivery date</option>
        </select>
        <select id="order" class="form-control d-inline-block" style="width: auto !important;">
            <option value="ASC">Ascending ^</option>
            <option value="DESC">Descending v</option>
        </select>
    </form>
    <div class="d-flex flex-wrap grid" id="my-offers-container">
		<!-- The offers will be loaded here -->
    </div>
</div>
<script>
    let base_url = `<?php echo base_url("/"); ?>` // Declare the base url for javascript
</script>
<script src="<?php echo js_url('masonry.pkgd.min.js'); ?>"></script>
<script src="<?php echo js_url('my-offers.js'); ?>"></script>
<style>
	.grid-item {
		float: left !important;
		width: 300px;
		border: 2px solid hsla(0, 0%, 0%, 0.5);
	}
</style>
