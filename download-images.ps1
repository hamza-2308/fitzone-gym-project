$images = @{
  "airbike.jpg" = "https://images.unsplash.com/photo-1591741535018-d042766c62eb?q=80&w=1200&auto=format&fit=crop"
  "treadmill.jpg" = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
  "barbell.jpg" = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop"
  "dumbbells.jpg" = "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1200&auto=format&fit=crop"
  "cable-crossover.jpg" = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
  "leg-press.jpg" = "https://images.unsplash.com/photo-1517964603305-4157af73a5f4?q=80&w=1200&auto=format&fit=crop"
  "battle-ropes.jpg" = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
  "kettlebell.jpg" = "https://images.unsplash.com/photo-1517341725840-6934d29e9938?q=80&w=1200&auto=format&fit=crop"
  "heavy-bag.jpg" = "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?q=80&w=1200&auto=format&fit=crop"
  "recovery-gun.jpg" = "https://images.unsplash.com/photo-1598575468023-adc340b73e07?q=80&w=1200&auto=format&fit=crop"
  "yoga.jpg" = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
  "trainer-1.jpg" = "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop"
  "trainer-2.jpg" = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
  "trainer-4.jpg" = "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop"
}

foreach ($name in $images.Keys) {
  $url = $images[$name]
  try {
    Invoke-WebRequest -Uri $url -OutFile "public\images\$name" -UseBasicParsing
    Write-Host "OK: $name"
  } catch {
    Write-Host "FAILED: $name"
  }
}