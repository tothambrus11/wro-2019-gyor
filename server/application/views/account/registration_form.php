<div class="container">
    <div class="d-flex justify-content-center h-100">
        <div class="card">
            <div class="card-header">
                <h3>Registration</h3>
            </div>
            <div class="card-body">
                <form method="post">
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                        </div>
                        <input type="text" class="form-control" placeholder="username" name="username">

                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-at"></i></span>
                        </div>
                        <input type="email" class="form-control" placeholder="email" name="email">
                    </div>
                    <div class="input-group form-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-key"></i></span>
                        </div>
                        <input type="password" class="form-control" placeholder="password" name="password">
                    </div>

                    <div class="row">
                        <div class="col-sm-8 d-flex justify-content-center links mb-2">
                            Do you have an account?<a href="<?php echo base_url("account/login/");?>">Log in!</a>
                        </div>
                        <div class="form-group col-sm-4">
                            <input type="submit" value="Register" class="btn  login_btn">
                        </div>
                    </div>

                </form>
            </div>
            <!--div class="card-footer">
                <div class="d-flex justify-content-center links">
                    Do you have an account?<a href="#">Log in!</a>
                </div>
            </div-->
        </div>
    </div>
</div>

<link rel="stylesheet" type="text/css" href="<?php echo css_url("account.css")?>">