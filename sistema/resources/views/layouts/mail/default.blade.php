<!DOCTYPE html>
    <html>
    	<head>
    	</head>
    	<body>
    		<table class="MsoNormalTable" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100.0%;background:#F5F8FA;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 0cm 0cm 0cm">
    			<tbody>
    				<tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes">
    					<td style="padding:0cm 0cm 0cm 0cm">
    						<div align="center">
    							<table class="MsoNormalTable" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100.0%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 0cm 0cm 0cm">
    								<tbody>
    									<tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes">
    										<td style="padding:18.75pt 0cm 18.75pt 0cm">
    											<p class="MsoNormal" align="center" style="text-align:center">
    												<span style="font-family:&quot;Helvetica&quot;,sans-serif;mso-fareast-font-family:&quot;Times New Roman&quot;">
    													<b>
															<span style="font-size:14.5pt;color:#BBBFC3;text-decoration:none;text-underline:none">
                                                                @env('production')
                                                                    Auditoria de Negócios e Tecnologia
                                                                @endenv
                                                                @env(['local', 'homologation'])
                                                                    Auditoria de Negócios e Tecnologia - {{env('APP_ENV')}}
                                                                @endenv
															</span>
    													</b>
    												</span>
    											</p>
    										</td>
    									</tr>
    									<tr style="mso-yfti-irow:1;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box">
    										<td width="100%" style="width:100.0%;border-top:solid #EDEFF2 1.0pt;border-left:none;border-bottom:solid #EDEFF2 1.0pt;border-right:none;mso-border-top-alt:solid #EDEFF2 .75pt;mso-border-bottom-alt:solid #EDEFF2 .75pt;background:white;padding:0cm 0cm 0cm 0cm;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;-premailer-cellpadding: 0;-premailer-cellspacing: 0;-premailer-width: 100%" cellpadding="0" cellspacing="0">
    											<div align="center">
    												<table class="MsoNormalTable" border="0" cellspacing="0" cellpadding="0" width="0" style="width:427.5pt;background:white;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 0cm 0cm 0cm;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;border-spacing: 0;box-sizing: border-box;-premailer-cellpadding: 0;-premailer-cellspacing: 0;-premailer-width: 570px">
    												 <!-- Body content -->
    													 <tbody>
    														<tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box">
    															<td style="padding:26.25pt 26.25pt 26.25pt 26.25pt;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box">
    																<h1 style="margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box">
    																	<span style="font-size:14.5pt;font-family:&quot;Helvetica&quot;,sans-serif;mso-fareast-font-family:&quot;Times New Roman&quot;;color:#2F3133">
    																		{{ $details['title'] }}
    																	</span>
    																</h1>
																	<div style="margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm;line-height:18.0pt;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box">
    																	<p style="font-family:&quot;Helvetica&quot;,sans-serif;color:#74787E">{!! $details['body'] !!}</p>
																	</div>
    															</td>
    														</tr>
    													</tbody>
    												</table>
    											</div>
    										</td>
    									</tr>
    									<tr style="mso-yfti-irow:2;mso-yfti-lastrow:yes;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box">
    										<td style="padding:0cm 0cm 0cm 0cm;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box">
    											<div align="center">
    												<table class="MsoNormalTable" border="0" cellspacing="0" cellpadding="0" width="0" style="width:427.5pt;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 0cm 0cm 0cm;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;border-spacing: 0;box-sizing: border-box;-premailer-cellpadding: 0;-premailer-cellspacing: 0;-premailer-width: 570px">
    													 <tbody>
    														<tr style="mso-yfti-irow:0;mso-yfti-firstrow:yes;mso-yfti-lastrow:yes;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box">
    															<td style="padding:26.25pt 26.25pt 26.25pt 26.25pt;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;border-spacing: 0;box-sizing: border-box;-premailer-cellpadding: 0;-premailer-cellspacing: 0;-premailer-width: 570px">
    																<p align="center" style="margin-top:0cm;margin-right:0cm;margin-bottom:7.5pt;margin-left:0cm;text-align:center;line-height:18.0pt;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box">
    																	<span style="font-size:9.0pt;font-family:&quot;Helvetica&quot;,sans-serif;color:#AEAEAE">
    																		@php
                                                                                $footer = '© '.date('Y').' Auditoria Interna.'
                                                                            @endphp
                                                                            {{$footer}}
    																	</span>
    																</p>
    															</td>
    														</tr>
    													</tbody>
    												</table>
    											</div>
    										</td>
    									</tr>
    								</tbody>
    							</table>
    						</div>
    					</td>
    				</tr>
    			</tbody>
    		</table>
    	</body>
    </html>