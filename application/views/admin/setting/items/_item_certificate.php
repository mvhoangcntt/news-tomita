<?php $item = !empty($item) ? (object)$item : null; ?>
<?php if (isset($_GET['id'])) $id = $_GET['id']; ?>
<?php if (isset($_GET['meta_key'])) $meta_key = $_GET['meta_key']; ?>
<fieldset>
  <div class="tab-pane" id="tab_store">
    <ul class="nav nav-tabs">
      <?php foreach ($this->config->item('cms_language') as $lang_code => $lang_name) { ?>
        <li<?php echo ($lang_code == 'vi') ? ' class="active"' : ''; ?>>
          <a href="#tab_<?php echo $lang_code . $id; ?>" data-toggle="tab">
            <?php echo $lang_name; ?>
          </a>
        </li>
      <?php } ?>
    </ul>
    <div class="tab-content">
      <?php foreach ($this->config->item('cms_language') as $lang_code => $lang_name) { ?>
        <div class="tab-pane <?php echo ($lang_code == 'vi') ? 'active' : ''; ?>"
             id="tab_<?php echo $lang_code . $id; ?>">
          <fieldset style="width: 100%" class="">
            <div class="row _flex">
              <div class="col-md-7">
                <input type="text"
                       name="<?php echo $meta_key; ?>[<?php echo $meta_key . $id; ?>][<?php echo $lang_code ?>][title]"
                       class="form-control"
                       placeholder="Tiêu đề" value="">

              </div>
              <div class="col-md-5 _flex">
                <input
                  id="<?php echo $meta_key; ?>_<?php echo $i; ?>"
                  name="<?php echo $meta_key; ?>[<?php echo $meta_key . $id; ?>][<?php echo $lang_code ?>][img]"
                  placeholder="Choose image..."
                  value="<?php echo isset($item->img) ? $item->img : '' ?>"
                  class="form-control" style="width: 70%;float: left" type="text" />

                <img onclick="chooseImage('<?php echo $meta_key; ?>_<?php echo $i; ?>')" style="float: right;margin-left: 15px"
                     src="<?php echo isset($item->img) ? getImageThumb(isset($item->img)) : 'http://via.placeholder.com/100x50'; ?>"
                     alt="" height="50" >
              </div>
            </div>
          </fieldset>
        </div>
      <?php } ?>
    </div>
  </div>

  <i class="glyphicon glyphicon-trash removeInput" onclick="removeInputImage(this)"></i>
</fieldset>