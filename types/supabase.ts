export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "dm-project-1-clients": {
        Row: {
          city: string | null
          code: string | null
          id: number
          imageUrl: string | null
          name: string | null
          phoneNumber: string
          region: string | null
          street: string | null
          surname: string | null
        }
        Insert: {
          city?: string | null
          code?: string | null
          id?: number
          imageUrl?: string | null
          name?: string | null
          phoneNumber: string
          region?: string | null
          street?: string | null
          surname?: string | null
        }
        Update: {
          city?: string | null
          code?: string | null
          id?: number
          imageUrl?: string | null
          name?: string | null
          phoneNumber?: string
          region?: string | null
          street?: string | null
          surname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_dm-project-1-clients_phoneNumber_fkey"
            columns: ["phoneNumber"]
            isOneToOne: true
            referencedRelation: "dm-project-1-orders"
            referencedColumns: ["phoneNumber"]
          }
        ]
      }
      "dm-project-1-invoice": {
        Row: {
          endDate: string | null
          id: number
          invoiceCost: number | null
          orderId: number | null
          phoneNumber: string | null
          startDate: string | null
        }
        Insert: {
          endDate?: string | null
          id?: number
          invoiceCost?: number | null
          orderId?: number | null
          phoneNumber?: string | null
          startDate?: string | null
        }
        Update: {
          endDate?: string | null
          id?: number
          invoiceCost?: number | null
          orderId?: number | null
          phoneNumber?: string | null
          startDate?: string | null
        }
        Relationships: []
      }
      "dm-project-1-orderInvoice": {
        Row: {
          id: number
          invoice_id: number
          order_id: number
        }
        Insert: {
          id?: number
          invoice_id: number
          order_id: number
        }
        Update: {
          id?: number
          invoice_id?: number
          order_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_dm-project-1-orderInvoice_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: true
            referencedRelation: "dm-project-1-invoice"
            referencedColumns: ["id"]
          }
        ]
      }
      "dm-project-1-orders": {
        Row: {
          id: number
          orderContent: string | null
          orderTitle: string | null
          paid: boolean | null
          phoneNumber: string
          quantity: number | null
        }
        Insert: {
          id?: number
          orderContent?: string | null
          orderTitle?: string | null
          paid?: boolean | null
          phoneNumber: string
          quantity?: number | null
        }
        Update: {
          id?: number
          orderContent?: string | null
          orderTitle?: string | null
          paid?: boolean | null
          phoneNumber?: string
          quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_dm-project-1-orders_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "dm-project-1-orderInvoice"
            referencedColumns: ["order_id"]
          }
        ]
      }
      "dm-project-1-users": {
        Row: {
          avatar: string | null
          id: number
          name: string | null
          username: string | null
        }
        Insert: {
          avatar?: string | null
          id?: number
          name?: string | null
          username?: string | null
        }
        Update: {
          avatar?: string | null
          id?: number
          name?: string | null
          username?: string | null
        }
        Relationships: []
      }
      randoomBlogComments: {
        Row: {
          commentContent: string | null
          createdAt: string
          id: number
          postID: number | null
          postIDContentful: string | null
          userEmail: string | null
          userID: string | null
          userName: string | null
        }
        Insert: {
          commentContent?: string | null
          createdAt?: string
          id?: number
          postID?: number | null
          postIDContentful?: string | null
          userEmail?: string | null
          userID?: string | null
          userName?: string | null
        }
        Update: {
          commentContent?: string | null
          createdAt?: string
          id?: number
          postID?: number | null
          postIDContentful?: string | null
          userEmail?: string | null
          userID?: string | null
          userName?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "randoomBlogComments_postID_fkey"
            columns: ["postID"]
            isOneToOne: false
            referencedRelation: "randoomBlogPosts"
            referencedColumns: ["id"]
          }
        ]
      }
      randoomBlogPosts: {
        Row: {
          createdAt: string
          id: number
          postIDContentful: string | null
          viewCount: number | null
        }
        Insert: {
          createdAt?: string
          id?: number
          postIDContentful?: string | null
          viewCount?: number | null
        }
        Update: {
          createdAt?: string
          id?: number
          postIDContentful?: string | null
          viewCount?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
