<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Media_library extends Public_Controller
{
    protected $_all_category;
    protected $_data_category;
    public $Course_model;

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data['heading_title'] = 'MV Hoàng';
        $data['main_content'] = $this->load->view($this->template_path . 'media_library/index', $data, TRUE);
        $this->load->view($this->template_main, $data);
    }
}
