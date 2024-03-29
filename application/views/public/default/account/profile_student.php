<section class="banner-cate v2">
    <div class="bn-img" style="background-image: url(<?php echo base_url('public/images/prf-banner2.jpg'); ?>)">
    </div>
    <div class="bn-content">
        <div class="container">
            <nav aria-label="breadcrumb">
                <?php echo !empty($breadcrumbs)? $breadcrumbs :  ''; ?>
            </nav>
            <h2 class="heading"><?php echo !empty($heading_title) ? $heading_title :'' ; ?></h2>
        </div>
    </div>
</section>

<section class="profile-page">
    <div class="container">
        <div class="row">
            <div class="col-xl-3">
                <?php $this->load->view($this->template_path . '_block/sidebar_menu_account'); ?>
            </div>
            <div class="col-xl-9">
                <div class="prf-content">
                    <div class="prf-head">
                        <h2 class="title"><?php echo lang('infoAccount') ?></h2>
                        <p><?php echo lang('seeEditAccount') ?></p>
                    </div>
                    <form class="prf-setting" action="javascript:;" id="profile_account">
                        <div class="prf-box">
                            <div class="avatar">
                                <div class="img">
                                    <img src="<?php echo getAvatarAccount($oneAccount->avatar) ?>" >
                                </div>
                                <div class="text">
                                    <h3 class="name"><?php echo $oneAccount->full_name ?></h3>
                                    <label class="change-avata">
                                        <input type="file" id="avatar" accept="image/x-png,image/gif,image/jpeg"><?php echo lang('editAvatar') ?>
                                    </label>
                                </div>
                            </div>
                            <div class="row col-mar-15">
                                <div class="col-md-6">
                                    <input type="text" class="input" name="full_name" placeholder="<?php echo lang('text_fullname') ?>" value="<?php echo $oneAccount->full_name ?>">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="input" name="phone" placeholder="<?php echo lang('text_phone') ?>" value="<?php echo $oneAccount->phone ?>">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" class="input" name="email" placeholder="Email" value="<?php echo $oneAccount->email;?>" readonly style="background: #eeeeee52;">
                                </div>
                                <div class="col-md-6">
                                    <div class="i-select input">
                                        <select name="gender">
                                            <option>Giới tính</option>
                                            <option value="1" <?php echo $oneAccount->gender==1 ? 'selected' : ''?>>Nam</option>
                                            <option value="2" <?php echo $oneAccount->gender==2 ? 'selected' : ''?>>Nữ</option>
                                            <option value="3" <?php echo $oneAccount->gender==3 ? 'selected' : ''?>>Khác</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <textarea class="textarea" placeholder="Giới thiệu bản thân" name="introduce_yourself" ><?php echo $oneAccount->introduce_yourself ?></textarea>
                        </div>
                        <div class="ctrl">
                            <button class="submit smooth updateProfile" ><?php echo lang('save_change') ?><span class="icon_load"><i class="fa fa-spinner fa-spin" style="font-size: 18px"></i></span></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>