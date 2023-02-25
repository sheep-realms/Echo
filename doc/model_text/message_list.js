echo.sendList([
	{
		message: [
			{
				text: '这是第一句话',
				style: {
					color: '#66ccff'
				}
			}
		]
	}, {
		message: '这是第二句话',
		data: {printSpeed:60}
	}
]);