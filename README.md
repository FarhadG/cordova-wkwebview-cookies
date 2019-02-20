# WkWebView Cookies POC

A simple POC to showcase cookies support for WkWebView.

## Problems

1) Custom Hostname
```xml
<allow-navigation href="ionic://app/*" />
<allow-navigation href="http://app/*" />
<preference name="Hostname" value="app" />
```

2) Custom Scheme
```xml
<allow-navigation href="httpsionic://*"/>
<allow-navigation href="https://*"/>
<preference name="Scheme" value="https" />
<preference name="iosScheme" value="httpsionic" />
```

3) Cannot see cookies inside of Safari's devtools (under application cookie storage)