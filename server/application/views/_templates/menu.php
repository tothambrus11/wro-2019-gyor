<nav class="navbar navbar-expand navbar-dark bg-dark static-top">

    <a class="navbar-brand mr-1" href="<?php echo base_url()?>"><?php echo $this->config->item("page_title"); ?></a>

    <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
        <i class="fas fa-bars"></i>
    </button>

    <!-- Navbar Search -->
    <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">

    </form>

    <!-- Navbar -->
    <ul class="navbar-nav ml-auto ml-md-0">
        <li class="nav-item dropdown no-arrow">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <?php echo $this->Account_model->get_user_field("nice_name", Account_model::$user_id);?>
                <i class="fas fa-user-circle fa-fw"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#">Settings</a>
                <a class="dropdown-item" href="#">Activity Log</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="<?php echo base_url('account/logout')?>">Logout</a>
            </div>
        </li>
    </ul>

</nav>

<div id="wrapper">

    <!-- Sidebar -->
    <ul class="sidebar navbar-nav">
        <li class="nav-item">
            <a class="nav-link" href="<?php echo base_url("account/dashboard");?>">
                <i class="fas fa-fw fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="<?php echo base_url("offer");?>" id="offerDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-hand-holding-heart"></i>
                <span>Offer</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="offerDropdown">
                <a class="dropdown-item d-block position-relative" href="<?php echo base_url("offer");?>">
                    <span class="menu-label">New offer</span>
                    <i class="menu-icon fas fa-hand-holding-heart"></i>
                </a>
                <a class="dropdown-item d-block position-relative" href="<?php echo base_url("offer/my-offers");?>">
                    <span class="menu-label">My offers</span>
                    <i class="fas fa-folder menu-icon"></i>
                </a>
            </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#newOrder" id="orderDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-shopping-cart"></i>
                <span>Order</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="orderDropdown">
                <a class="dropdown-item position-relative" href="<?php echo base_url('order'); ?>">
                    <span class="menu-label">Order</span>
                    <i class="fas fa-cart-plus menu-icon"></i>
                </a>
                <a class="dropdown-item position-relative" href="<?php echo base_url('order/my_orders'); ?>">
                    <span class="menu-label">My orders</span>
                    <i class="fas fa-shopping-cart menu-icon"></i>
                </a>
            </div>
        </li>
        <li class="nav-item active">
            <a class="nav-link" href="#about_us" onclick="alert('No help :(')">
                <i class="fas fa-fw fa-question-circle"></i>
                <span>Help</span></a>
        </li>

    </ul>

    <div id="content-wrapper">

        <div class="container-fluid">
