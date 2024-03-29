<?php
/**
 * CopyToCommand.php
 *
 * Copyright 2003-2013, Moxiecode Systems AB, All rights reserved.
 */

/**
 * Command that copies single or multiple files.
 *
 * @package MOXMAN_Commands
 */
class MOXMAN_Commands_CopyToCommand extends MOXMAN_Commands_BaseCommand {
	/**
	 * Executes the command logic with the specified RPC parameters.
	 *
	 * @param Object $params Command parameters sent from client.
	 * @return Object Result object to be passed back to client.
	 */
	public function execute($params) {
		$from = $params->from;
		$to = $params->to;

		// Copy multiple files
		if (is_array($from)) {
			$result = array();
			foreach ($from as $path) {
				$fromFile = MOXMAN::getFile($path);
				$toFile = MOXMAN::getFile($to, $fromFile->getName());
				$toFile = $this->copyFile($fromFile, $toFile);

				$result[] = parent::fileToJson($toFile, true);
			}

			return $result;
		}

		// Copy single file
		$fromFile = MOXMAN::getFile($from);
		$toFile = MOXMAN::getFile($params->to);
		$this->copyFile($fromFile, $toFile);

		return parent::fileToJson($toFile, true);
	}

	/** @ignore */
	private function copyFile($fromFile, $toFile) {
		$config = $toFile->getConfig();

		if ($config->get('general.demo')) {
			throw new MOXMAN_Exception(
				"This action is restricted in demo mode.",
				MOXMAN_Exception::DEMO_MODE
			);
		}

		if (!$fromFile->exists()) {
			throw new MOXMAN_Exception(
				"From file doesn't exist: " . $fromFile->getPublicPath(),
				MOXMAN_Exception::FILE_DOESNT_EXIST
			);
		}

		if (!$toFile->canWrite()) {
			throw new MOXMAN_Exception(
				"No write access to file: " . $toFile->getPublicPath(),
				MOXMAN_Exception::NO_WRITE_ACCESS
			);
		}

		$filter = MOXMAN_Vfs_BasicFileFilter::createFromConfig($config);
		if (!$filter->accept($fromFile, $fromFile->isFile())) {
			throw new MOXMAN_Exception(
				"Invalid file name for: " . $fromFile->getPublicPath(),
				MOXMAN_Exception::INVALID_FILE_NAME
			);
		}

		// Fire before file action event
		$args = new MOXMAN_Vfs_FileActionEventArgs(MOXMAN_Vfs_FileActionEventArgs::COPY, $fromFile);
		$args->setTargetFile($toFile);
		$args->getData()->fileSize = $fromFile->getSize();
		MOXMAN::getPluginManager()->get("core")->fire("BeforeFileAction", $args);
		$fromFile = $args->getFile();
		$toFile = $args->getTargetFile();

		// To file exists generate unique name
		$fileName = $toFile->getName();
		$ext = MOXMAN_Util_PathUtils::getExtension($fileName);
		for ($i = 2; $toFile->exists(); $i++) {
			if ($toFile->isFile() && $ext) {
				$toFile = MOXMAN::getFile($toFile->getParent(), basename($fileName, '.' . $ext) . '_' . $i . '.' . $ext);
			} else {
				$toFile = MOXMAN::getFile($toFile->getParent(), $fileName . '_' . $i);
			}
		}

		$fromFile->copyTo($toFile);

		$this->fireTargetFileAction(MOXMAN_Vfs_FileActionEventArgs::COPY, $fromFile, $toFile);

		return $toFile;
	}
}

?>